import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

let client: pg.Client | pg.Pool;

if (isProduction) {
  client = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
} else {
  client = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: parseInt(process.env.PG_PORT || "5432"),
  });
}

type QueryObj = { sql: string; params?: any[] };

export async function query(
  sql: string,
  params?: any[]
): Promise<pg.QueryResult>;
export async function query(q: QueryObj): Promise<pg.QueryResult>;

export async function query(arg: string | QueryObj, paramsArg?: any[]) {
  let text: string;
  let params: any[] | undefined;

  if (typeof arg === "string") {
    text = arg;
    params = paramsArg;
  } else {
    text = arg.sql;
    params = arg.params;
  }

  return (client as any).query(text, params);
}
