import express, { json } from "express";
import pkg from "body-parser";
import cors from "cors";

const { json: _json, urlencoded } = pkg;
import { connect } from "mongoose";

import { serve, setup } from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

import config from "../config.mjs";

// Connect to MongoDB
console.log("API: connecting to MongoDB...");
const uri = `mongodb://${encodeURIComponent(
  config.db.username
)}:${encodeURIComponent(config.db.password)}@${config.db.host}:${
  config.db.port
}/${config.db.dbName}`;
connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

// Start browser
import { setupBrowser } from "./browser/browser.js";
console.log("API: starting browser instance...");
await setupBrowser();
console.log("API: logged in and ready");

import showRoutes from "./routes/showRoutes.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(json({ limit: "50mb" }));
app.use(_json());
app.use(urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.use("/api-docs", serve, setup(swaggerSpec));

app.use("/", showRoutes);
app.get("/health", (request, response) => {
  response.json({ message: "API server is running", running: true });
});

// Define the port and start the server
const PORT = config.api.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
