import { AxiosError } from "axios";
import { ISquad } from "../interface/squads";
import { api } from "./api.service";

export const SquadService ={
    getAllSquads: async (token: string): Promise<ISquad[]> => {
        try {
          const response = await api.get<ISquad[]>('/session/squad', { 
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          return response.data;
        } catch (error) {
          if (error instanceof AxiosError && error.response) {
            throw new Error(error.response.data.message || 'Falha ao obter squads');
          }
          throw new Error('Falha ao obter squads');
        }
      },
}