import pg from "pg";
import dotenv from "dotenv";

type QueryArg = string | { sql: string; params?: any[] };

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

let client: pg.Pool;

if (isProduction) {
  client = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  console.log("Using production Neon database");
} else {
  client = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: parseInt(process.env.PG_PORT || "5432"),
  });
  console.log("Using local database");
}

export async function query(arg: QueryArg, paramsArg?: any[]) {
  const text = typeof arg === "string" ? arg : arg.sql;
  const params = typeof arg === "string" ? paramsArg : arg.params;

  try {
    return await client.query(text, params);
  } catch (error) {
    console.error("Query error:", error);
    throw error;
  }
}
