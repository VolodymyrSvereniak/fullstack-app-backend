import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

let db: pg.Client;

if (isProduction) {
  // Production (Render + Neon)
  db = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // required for Neon
  });
} else {
  db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: parseInt(process.env.PG_PORT || "5432"),
  });
}

db.connect()
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.error("DB connection error:", err);
    process.exit(1);
  });

export const query = (sql: string, params?: any[]) => db.query(sql, params);
