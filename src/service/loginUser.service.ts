import { ILoginUser } from "../interface/user";
import { api } from "./api.service";
import { AxiosError } from "axios";

export const LoginUser = {
  login: async (loginUser: ILoginUser) => {
    try {
      const response = await api.post('/session/authentication', loginUser);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message || 'Falha no Login');
      }
      throw new Error('Falha no Login');
    }
  }
}
