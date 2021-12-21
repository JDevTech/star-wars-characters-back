"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const species_1 = __importDefault(require("./routes/species"));
const characters_1 = __importDefault(require("./routes/characters"));
const not_found_1 = __importDefault(require("./utils/middleware/not-found"));
const errors_1 = require("./utils/middleware/errors");
const corsOpts = {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOpts));
(0, species_1.default)(app);
(0, characters_1.default)(app);
// 404 Error Handler
app.use(not_found_1.default);
// Error Middlewares
app.use(errors_1.logErrors);
app.use(errors_1.wrapErrors);
app.use(errors_1.errorHandler);
app.listen(config_1.default.port, () => {
    console.log(`Listening http://localhost:${config_1.default.port}`);
});
