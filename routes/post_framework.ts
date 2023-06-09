import { getClient } from "../lib/db.js";
import type { Route } from "@endpts/types";

export default {
  method: "POST",
  path: "/frameworks",
  async handler(req) {
    const { name, language, url, stars } = await req.json();

    if (!name || !language || !url || !stars) {
      return Response.json({ message: "Missing fields!" }, { status: 400 });
    }

    const client = getClient();

    const { rows: frameworks } = await client.execute({
      sql: "INSERT INTO frameworks(name, language, url, stars) VALUES(?, ?, ?, ?) RETURNING *",
      args: [name, language, url, stars],
    });

    return Response.json(frameworks[0]);
  },
} satisfies Route;
