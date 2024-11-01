import { DecodedToken } from "../interface/decoded";
import {jwtDecode} from 'jwt-decode';

export const getUserDataFromToken = () => {
    const token = localStorage.getItem('tokenSecurity');
    if (!token) return null;

    try {
        const decoded = jwtDecode<DecodedToken>(token);

        return {
            permissionId: decoded.permission?.permission_id || null, 
            username: decoded.username,
            userType: decoded.permission?.name || 'Desconhecido',
            permissionUserId: decoded.permissionUser?.permissionUser_id || null
        };
    } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return null;
    }
}
