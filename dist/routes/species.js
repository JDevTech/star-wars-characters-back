"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const species_1 = __importDefault(require("../services/species"));
const express_1 = __importDefault(require("express"));
const SpeciesRoutes = (app) => {
    const router = express_1.default.Router();
    app.use("/api/species", router);
    const speciesService = new species_1.default();
    router.get("/:specieId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { specieId } = req.params;
        try {
            const specie = yield speciesService.getSpecieById({
                specieId,
            });
            const parsedSpecie = (0, utils_1.mapSpecie)(specie.data);
            res.status(200).json({
                specie: parsedSpecie,
            });
        }
        catch (err) {
            next(err);
        }
    }));
};
exports.default = SpeciesRoutes;
