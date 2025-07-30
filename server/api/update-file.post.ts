import { Err } from "lib-result";

const OWNER = "AhmedOsman101";
const REPO = "learning-japanese-tracker";
const BRANCH = "main";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const PASSWORD = process.env.PASSWORD;

export default defineEventHandler(async event => {
  const body = await readBody<{
    increment: number;
    file: "jlpt" | "kani";
    field: string;
    password: string;
  }>(event);

  if (!GITHUB_TOKEN) {
    return Err(
      createError({
        statusCode: 500,
        statusMessage: "Missing GitHub token",
      })
    );
  }

  if (!PASSWORD) {
    return Err(
      createError({
        statusCode: 500,
        statusMessage: "Missing password",
      })
    );
  }

  if (body.password.trim() !== PASSWORD) {
    return Err(
      createError({
        statusCode: 401,
        statusMessage: "Incorrect password",
      })
    );
  }

  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/public/data/${body.file}.json`;

  // Get existing file to retrieve `sha`
  const existing = (await $fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  }).catch(() => null)) as any;

  const websiteUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NUXT_PUBLIC_SITE_URL;

  const content = await fetch(`${websiteUrl}/data/${body.file}.json`).then(
    resp => resp.json()
  );

  const contentEncoded = Buffer.from(
    JSON.stringify(transformContent(body.field, body.increment, content))
  ).toString("base64");

  const res = await $fetch(apiUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
    body: {
      message: "chore: update files via user input",
      content: contentEncoded,
      sha: existing?.sha,
      branch: BRANCH,
    },
  });

  console.log(res);

  return { message: "Progress updated successfully 🎉" };
});

function transformContent(field: string, increment: number, content: any) {
  const parts = field.split(".");
  const newContent = content;
  console.log(content);

  switch (parts[0]) {
    case "hiragana":
    case "katakana":
      newContent[parts[0]].memorized += increment;
      break;
    default:
      newContent[parts[0]][parts[1]].memorized += increment;
      break;
  }

  return newContent;
}
