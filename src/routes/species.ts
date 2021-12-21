import { mapSpecie } from "../utils";
import SpeciesService from "../services/species";
import { SpecieResponse } from "../utils/@types";
import express, { Router, Express, Request } from "express";

type ReqParams = { specieId: string };
type SpeciesRequest = Request<ReqParams, {}, {}, {}>;

const SpeciesRoutes = (app: Express): void => {
  const router: Router = express.Router();
  app.use("/api/species", router);

  const speciesService = new SpeciesService();

  router.get("/:specieId", async (req: SpeciesRequest, res, next) => {
    const { specieId } = req.params;
    try {
      const specie: SpecieResponse = await speciesService.getSpecieById({
        specieId,
      });

      const parsedSpecie = mapSpecie(specie.data);

      res.status(200).json({
        specie: parsedSpecie,
      });
    } catch (err) {
      next(err);
    }
  });
};

export default SpeciesRoutes;
