import pg from "pg";
import dotenv from "dotenv";

interface QueryProps {
  sql: string;
  params?: any[];
}

dotenv.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT || "5432"),
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

db.connect();

db.on("error", (err) => {
  console.error("Database error", err);
  process.exit(-1);
});

export const query = ({ sql, params }: QueryProps) => db.query(sql, params);
