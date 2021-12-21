import { AxiosInstance } from "axios";
import ServicesInstance from "./__config";
import {
  Character,
  Characters,
  CharacterResponse,
  CharactersResponse,
} from "../utils/@types";

type ParamsType = { page?: string | null; characterId?: string };

class CharactersService {
  service: AxiosInstance;
  apiPrefix: string = "people";

  constructor() {
    this.service = ServicesInstance;
  }

  async getCharacters({ page }: ParamsType): Promise<CharactersResponse> {
    const characters: CharactersResponse = await this.service.get<Characters>(
      this.apiPrefix,
      {
        params: { page },
      }
    );
    return characters || [];
  }

  async getCharacterById({
    characterId,
  }: ParamsType): Promise<CharacterResponse> {
    const urlWithId = `${this.apiPrefix}/${characterId}`;
    const character: CharacterResponse = await this.service.get<Character>(
      urlWithId
    );
    return character || {};
  }
}

export default CharactersService;
