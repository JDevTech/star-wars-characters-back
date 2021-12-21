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
const cache_1 = __importDefault(require("../utils/cache"));
const characters_1 = __importDefault(require("../services/characters"));
const time_1 = require("../utils/time");
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const CharactersRoutes = (app) => {
    const router = express_1.default.Router();
    app.use("/api/characters", router);
    const charactersService = new characters_1.default();
    router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { page } = req.query;
        (0, cache_1.default)(res, time_1.FIVE_MINUTES_IN_SECONDS);
        try {
            const characters = yield charactersService.getCharacters({ page });
            const { data: { results, count, next, previous }, } = characters;
            const nextPage = (0, utils_1.getQueryParamsFromURL)(next);
            const parsedCharacters = (0, utils_1.mapCharacters)(results);
            const previousPage = (0, utils_1.getQueryParamsFromURL)(previous);
            res.status(200).json({
                count,
                next: nextPage,
                previous: previousPage,
                characters: parsedCharacters,
                message: "The characters have been listed",
            });
        }
        catch (err) {
            next(err);
        }
    }));
    router.get("/:characterId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { characterId } = req.params;
        try {
            const character = yield charactersService.getCharacterById({ characterId });
            const parsedCharacter = (0, utils_1.mapCharacter)(character.data);
            res.status(200).json({
                character: parsedCharacter,
            });
        }
        catch (err) {
            next(err);
        }
    }));
};
exports.default = CharactersRoutes;
