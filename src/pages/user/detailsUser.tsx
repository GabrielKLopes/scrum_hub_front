import React, { useEffect, useState } from "react";
import { IUser } from "../../interface/user";
import { UserService } from "../../service/users.service";
import { useParams } from "react-router-dom";
import Layout from "../../componets/Layout"; 
import InputForm from "../../componets/Input"; 

const DetailsUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("tokenSecurity");
      if (token && id) {
        const userData = await UserService.getById(token, parseInt(id));
        setUser(userData);
      } else {
        throw new Error("Token de autenticação ou ID de usuário não encontrado");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Layout>
      <div className="p-6 flex justify-center items-center min-h-full">
        {loading ? (
          <div className="text-xl text-gray-500">Carregando...</div>
        ) : error ? (
          <p className="text-red-500">Erro: {error}</p>
        ) : user ? (
          <div className="p-6 w-full shadow-md rounded-lg">
            <div className="flex items-center flex-col space-x-4 mb-4">
              <div className="w-16 h-16 bg-orange-300 rounded-full flex-shrink-0 flex items-center justify-center text-2xl text-white font-semibold mb-10">
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt={`${user.name}'s photo`}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  (user.name || "").charAt(0)
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-orange-600">{user.name}</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-gray-700"> 
              <InputForm
                label="Nome"
                value={user.name || ""}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                type="text"
                readOnly
              />
              <InputForm
                label="Email"
                value={user.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="email"
                readOnly
              />
             
            </div>
            <div className="grid grid-cols-3 gap-4 text-gray-700 mt-4"> 
              <InputForm
                label="Squad"
                value={user.squad ? user.squad.name : "Não atribuído"}
                readOnly
                type="text"
              />
              <InputForm
                label="Função"
                value={user.permission ? user.permission.name : "Sem função atribuída"}
                readOnly
                type="text"
              />
               <InputForm
                label="Permissão"
                value={user.permissionUser ? user.permissionUser.name : "Sem Permissão"}
                readOnly
                type="text"
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Usuário não encontrado</p>
        )}
      </div>
    </Layout>
  );
};

export default DetailsUser;
