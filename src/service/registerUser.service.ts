import { IRegisterUser } from "../interface/user";
import { api } from "./api.service";
import { AxiosError } from "axios";

export const RegisterUser = {
  register: async (registerUser: IRegisterUser) => {
    try {
      const response = await api.post('/session/user/register', registerUser);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message || 'Falha no registro');
      }
      throw new Error('Falha no registro');
    }
  }
}
