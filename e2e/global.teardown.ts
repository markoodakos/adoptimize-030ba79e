import * as fs from "fs";
import * as path from "path";
import { deleteTestUser, getTestUserFromFile } from "./test-data";

const authFile = path.join(__dirname, ".auth/user.json");
const baseUrl = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:8080";

async function globalTeardown() {
  const testUser = getTestUserFromFile(authFile, baseUrl);

  if (!testUser) {
    console.log("No test user found in storage state, skipping cleanup");
    return;
  }

  console.log(`Deleting test user: ${testUser.userId}`);
  await deleteTestUser(testUser.userId);
  console.log("Test user deleted successfully");

  if (fs.existsSync(authFile)) {
    fs.unlinkSync(authFile);
  }
}

export default globalTeardown;
