import chacheResponse from "../utils/cache";
import CharactersService from "../services/characters";
import { FIVE_MINUTES_IN_SECONDS } from "../utils/time";
import express, { Router, Express, Request } from "express";
import { CharacterResponse, CharactersResponse } from "../utils/@types";
import { mapCharacter, mapCharacters, getQueryParamsFromURL } from "../utils";

type ReqQuery = { page: string | null };
type ReqParams = { characterId: string };
type CharactersRequest = Request<ReqParams, {}, {}, ReqQuery>;

const CharactersRoutes = (app: Express): void => {
  const router: Router = express.Router();
  app.use("/api/characters", router);

  const charactersService = new CharactersService();

  router.get("/", async (req: CharactersRequest, res, next) => {
    const { page } = req.query;
    chacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    try {
      const characters: CharactersResponse =
        await charactersService.getCharacters({ page });

      const {
        data: { results, count, next, previous },
      } = characters;

      const nextPage = getQueryParamsFromURL(next);
      const parsedCharacters = mapCharacters(results);
      const previousPage = getQueryParamsFromURL(previous);

      res.status(200).json({
        count,
        next: nextPage,
        previous: previousPage,
        characters: parsedCharacters,
        message: "The characters have been listed",
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:characterId", async (req: CharactersRequest, res, next) => {
    const { characterId } = req.params;
    try {
      const character: CharacterResponse =
        await charactersService.getCharacterById({ characterId });

      const parsedCharacter = mapCharacter(character.data);

      res.status(200).json({
        character: parsedCharacter,
      });
    } catch (err) {
      next(err);
    }
  });
};

export default CharactersRoutes;
