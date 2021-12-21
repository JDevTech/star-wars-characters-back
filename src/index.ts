import config from "./config";

import cors from "cors";
import express from "express";
import SpeciesRoutes from "./routes/species";
import CharactersRoutes from "./routes/characters";
import notFoundHandler from "./utils/middleware/not-found";
import { logErrors, errorHandler, wrapErrors } from "./utils/middleware/errors";

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

const app = express();
app.use(express.json());
app.use(cors(corsOpts));

SpeciesRoutes(app);
CharactersRoutes(app);

// 404 Error Handler
app.use(notFoundHandler);

// Error Middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
