import express from "express";
import cors from "cors";
import clientRoute from "./routes/clientRoute.js";

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", clientRoute);

app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
