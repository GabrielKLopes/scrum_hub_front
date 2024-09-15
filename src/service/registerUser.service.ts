import { IRegisterUser } from "../interface/user";
import { api } from "./api.service";

export const RegisterUser = {
    register: async (registerUser: IRegisterUser) =>{
        try{
            const response = await api.post('/session/user/register', registerUser)
            return response.data
        }catch(error){
            throw new Error('register failed')
        }
    } 
}