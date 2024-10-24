import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config/auth";
import connectDB from "./database/db";
import { useRoute } from "./routes/userRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", useRoute);

connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${config.port}`
      );
    });
  })
  .catch((err) => console.log(err));
