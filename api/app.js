import express, { json } from "express";
import pkg from "body-parser";
import cors from "cors";

import { connect } from "mongoose";
import { createMongoDbUser } from "./composables/createUser.js";

import { serve, setup } from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

import config from "../config.mjs";
import { setupBrowser } from "./browser/browser.js";

import showRoutes from "./routes/showRoutes.js";
import manageRoutes from "./routes/manageRoutes.js";

console.log("API: starting up...");

// Connect to MongoDB
const { json: _json, urlencoded } = pkg;
console.log("API: connecting to MongoDB...");

// Create user/database if non existent
try {
  await createMongoDbUser();
} catch (error) {
  // User exists
}

const uri = `mongodb://${encodeURIComponent(
  config.db.username
)}:${encodeURIComponent(config.db.password)}@${config.db.host}:${
  config.db.port
}/${config.db.dbName}`;

connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("API: MongoDB connected..."))
  .catch((err) => console.log(err));

// Initialise browser instance
console.log("API: starting browser instance...");
await setupBrowser();
console.log("API: logged in and ready");

// Initialise routing
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
app.use("/manage", manageRoutes);
app.get("/health", (request, response) => {
  response.json({ message: "API server is running", running: true });
});

// Define the port and start the server
const PORT = config.api.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
