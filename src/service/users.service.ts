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
  },

  getById: async (token: string, userId: number): Promise<IUser> => {
    try {
      const response = await api.get<IUser>(`/session/user/create/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message || 'Falha ao obter usuário');
      }
      throw new Error('Falha ao obter usuário');
    }
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

  deleteUser: async (token: string, userId: number): Promise<void> => {
    try {
      await api.delete(`/session/user/create/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message || 'Falha ao deletar usuário');
      }
      throw new Error('Falha ao deletar usuário');
    }
  },
};
