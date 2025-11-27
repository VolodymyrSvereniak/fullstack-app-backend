import express from "express";
import cors from "cors";
import clientRoute from "./routes/clientRoute.js";

const app = express();

const port = process.env.PORT || 3000;

const allowedOrigins = ["http://localhost:5173", /\.vercel\.app$/];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (
        allowedOrigins.some((allowed) => {
          return allowed instanceof RegExp
            ? allowed.test(origin)
            : allowed === origin;
        })
      ) {
        callback(null, true);
      } else {
        console.log("Blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", clientRoute);

app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
