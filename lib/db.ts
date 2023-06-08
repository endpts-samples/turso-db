import { createClient } from "@libsql/client/web";

const url = process.env.TURSO_DB_URL;
const authToken = process.env.TURSO_DB_AUTH_TOKEN;

if (!url || !authToken) {
  throw new Error(
    "Please fill the TURSO_DB_URL and TURSO_DB_AUTH_TOKEN env variables"
  );
}

export const client = createClient({
  url,
  authToken,
});
