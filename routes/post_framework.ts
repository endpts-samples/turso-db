import { client } from "../lib/db.js";
import type { Route } from "@endpts/types";

export default {
  method: "POST",
  path: "/frameworks",
  async handler(req) {
    const { name, language, url, stars } = await req.json();

    if (!name || !language || !url || !stars) {
      return Response.json({ message: "Missing fields!" }, { status: 400 });
    }

    await client.execute({
      sql: "INSERT INTO frameworks(name, language, url, stars) VALUES(?, ?, ?, ?)",
      args: [name, language, url, stars],
    });

    const { rows: frameworks } = await client.execute({
      sql: "SELECT * FROM frameworks WHERE url = ?",
      args: [url],
    });

    return Response.json(frameworks[0]);
  },
} satisfies Route;
