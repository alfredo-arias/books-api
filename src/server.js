import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./models/index.js";
import * as v1Routes from "./routes/v1/index.js";
import { swaggerDocs as V1SwaggerDocs } from "./routes/swagger.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

const server = express();

server.use(express.json());
server.use(cors());

server.use(v1Routes.bookRouter);
server.use(v1Routes.languageRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  V1SwaggerDocs(server, PORT);
});

db.mongoose
  .connect(DB_URL, {})
  .then(() => {
    console.log(`Connected to MongoDB on ${DB_URL}.`);
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
