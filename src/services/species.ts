import { AxiosInstance } from "axios";
import ServicesInstance from "./__config";
import { Specie, SpecieResponse } from "../utils/@types";

type ParamsType = { specieId: string };

class SpeciesService {
  service: AxiosInstance;
  apiPrefix: string = "species";

  constructor() {
    this.service = ServicesInstance;
  }

  async getSpecieById({ specieId }: ParamsType): Promise<SpecieResponse> {
    const urlWithId = `${this.apiPrefix}/${specieId}`;
    const specie: SpecieResponse = await this.service.get<Specie>(urlWithId);
    return specie || {};
  }
}

export default SpeciesService;
