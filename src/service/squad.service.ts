import { AxiosError } from "axios";
import { ISquad, ISquadCreate } from "../interface/squads";
import { api } from "./api.service";
import { UserService } from "./users.service";
import { IUser } from "../interface/user";

export const SquadService = {
  async getAllSquads(token: string): Promise<ISquad[]> {
    try {
      const response = await api.get<ISquad[]>("/session/squad", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.map(squad => ({
        ...squad,
        users: squad.users || []
      }));
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message || "Falha ao obter squads");
      }
      throw new Error("Falha ao obter squads");
    }
  },

  async getSquadById(token: string, squadId: number): Promise<ISquad> {
    try {
      const response = await api.get<ISquad>(`/session/squad/${squadId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return {
        ...response.data,
        users: response.data.users || []
      };
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message || "Falha ao obter squad");
      }
      throw new Error("Falha ao obter squad");
    }
  },
  


  createSquad: async (token: string, squad: ISquadCreate): Promise<ISquad> => {
    try {
      const response = await api.post<ISquad>("/session/squad/createSquad", squad, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const squadId = response.data.squad_id;
  
      if (squad.users && squad.users.length > 0) {
        await Promise.all(
          squad.users.map((user) => {
            if (user.user_id) {
             
              return UserService.updateUser(token, user.user_id, {
                squad: { squad_id: squadId } 
              });
            } else {
              return Promise.resolve(); 
            }
          })
        );
      }
      return response.data;
    } catch (err) {
      console.error("Erro ao criar squad:", err);
      throw err; 
    }
  },
  
  



 
};


