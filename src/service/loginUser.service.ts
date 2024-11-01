import { jwtDecode, JwtPayload } from "jwt-decode";
import { ILoginUser } from "../interface/user";
import { api } from "./api.service";
import { AxiosError } from "axios";


interface CustomJwtPayload extends JwtPayload {
  exp?: number; 
}
export const LoginUser = {
  login: async (loginUser: ILoginUser) => {
    try {
      const response = await api.post('/session/authentication', loginUser);
      const token = response.data.token;

      if (token) {
        localStorage.setItem('tokenSecurity', token);
      }

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message || 'Falha no Login');
      }
      throw new Error('Falha no Login');
    }
  },

  checkToken: () => {
    const token = localStorage.getItem('tokenSecurity');

    if (token && isTokenExpired(token)) {
      localStorage.removeItem('tokenSecurity'); 
      return null; 
    }
    return token; 
  }
}



const isTokenExpired = (token: string) => {
  const decodedToken = jwtDecode<CustomJwtPayload>(token);
  const currentTime = Date.now() / 1000;

  if (!decodedToken.exp) {
    throw new Error('Token não contém a propriedade exp.');
  }

  return decodedToken.exp < currentTime; 
};
