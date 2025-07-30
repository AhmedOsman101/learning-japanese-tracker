import { Err } from "lib-result";
import {
  BRANCH,
  GITHUB_API_URL,
  GITHUB_RAW_URL,
  GITHUB_TOKEN,
  PASSWORD,
} from "~/shared/constants";

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

  const apiUrl = `${GITHUB_API_URL}/data/${body.file}.json`;

  // Get existing file to retrieve `sha`
  const existing = (await $fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
    },
  }).catch(() => null)) as any;

  const content = await fetch(`${GITHUB_RAW_URL}/data/${body.file}.json`).then(
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
