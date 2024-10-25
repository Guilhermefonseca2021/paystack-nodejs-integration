import express, { Request, Response } from "express";
import cors from "cors";
import config from "./config/auth";
import connectDB from "./database/db";
import { useRoute } from "./routes/userRoutes";
import planRoute from "./routes/planRoutes";
import ngrok from "@ngrok/ngrok";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", useRoute);
app.use("/plans", planRoute);

connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${config.port}`
      );
    });
    if (config.node_env == "development") {
      (async function () {
        const data = await ngrok.connect({
          addr: config.port,
          authtoken_from_env: true,
          authtoken: config.ngrok_token,
        });
        console.log(`Ingress established at: ${data.url.name}`);
      })();
    }
  })
  .catch((err) => console.log(err));
