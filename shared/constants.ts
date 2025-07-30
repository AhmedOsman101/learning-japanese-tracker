const OWNER = "AhmedOsman101";
const REPO = "learning-japanese-tracker";
const BRANCH = "main";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const PASSWORD = process.env.PASSWORD;

const GITHUB_RAW_URL = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}`;
const GITHUB_API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/contents`;

export {
  PASSWORD,
  BRANCH,
  GITHUB_TOKEN,
  OWNER,
  REPO,
  GITHUB_RAW_URL,
  GITHUB_API_URL,
};
