import { getClient } from "../lib/db.js";
import type { Route } from "@endpts/types";

export default {
  method: "GET",
  path: "/frameworks",
  async handler() {
    const client = getClient();

    const { rows: frameworks } = await client.execute(
      "SELECT * FROM frameworks ORDER BY stars DESC"
    );

    return Response.json(frameworks);
  },
} satisfies Route;
