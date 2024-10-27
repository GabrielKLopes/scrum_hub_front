import { AxiosError } from "axios";
import { IUser, IUserCreate } from "../interface/user";
import { api } from "./api.service";

export const UserService = {
  getAll: async (token: string): Promise<IUser[]> => {
    try {
      const response = await api.get<IUser[]>('/session/user/create', {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message || 'Falha ao obter usuários');
      }
      throw new Error('Falha ao obter usuários');
    }
    return []; 
  },


  createUser: async (token: string, userData: IUserCreate): Promise<IUser> => {
    try {
      const response = await api.post<IUser>('/session/user/create', userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message || 'Falha ao criar usuário');
      }
      throw new Error('Falha ao criar usuário');
    }
  },

  
};
