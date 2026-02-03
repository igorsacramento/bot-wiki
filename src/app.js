import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

const app = express();
const router = express.Router();

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
    parameterLimit: 1000000,
  }),
);
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Authorization", "Content-Type"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

import setupRoutes from "./routes/insertRoutes.js";

// Função para inicializar o app com as rotas
export async function createApp() {
  await setupRoutes(app);
  return app;
}

export default app;
