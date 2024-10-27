import React, { useEffect, useState } from "react";
import { IUser, IUserCreate } from "../../interface/user";
import { UserService } from "../../service/users.service";
import Button from "../../componets/Button";
import CreateUserCard from "../../componets/CreateUserCard";
import Layout from "../../componets/Layout";

const User: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("tokenSecurity");
      if (token) {
        const usersData = await UserService.getAll(token);
        setUsers(usersData);
      } else {
        throw new Error("Token de autenticação não encontrado");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (userData: IUserCreate) => {
    const token = localStorage.getItem("tokenSecurity");
    if (token) {
      try {
        await UserService.createUser(token, userData);
        setShowCreateForm(false);
        fetchUsers(); // Atualiza a lista de usuários
      } catch (err) {
        console.error(err instanceof Error ? err.message : "Erro desconhecido ao criar usuário");
      }
    }
  };

  return (
    <Layout>
      <div className="p-6 h-full w-full flex flex-col">
        <div className="flex justify-between mt-5 mb-5">
          <h1 className="text-2xl font-semibold text-orange-500">Usuários</h1>
          <Button
            className="text-lg font-semibold text-center w-auto h-auto bg-orange-600 text-white rounded-lg hover:bg-orange-700"
            onClick={() => setShowCreateForm(true)}
          >
            Criar Usuário
          </Button>
        </div>

        {loading && <p>Carregando usuários...</p>}
        {error && <p className="text-red-500">Erro: {error}</p>}

        {!loading && !error && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 border border-customBg rounded-lg shadow-lg bg-customBg flex flex-col items-center"
              >
                <div className="w-24 h-24 bg-orange-300 rounded-full flex items-center justify-center text-3xl text-white font-semibold mb-2">
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt={`${user.name || "Usuário"}'s photo`}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    (user.name || "").charAt(0)
                  )}
                </div>
                <p className="font-semibold text-lg text-orange-600">
                  {user.name}
                </p>
                <p className="text-orange-500 opacity-90">
                  {user.permissionUser ? user.permissionUser.name : "Sem Permissão"}
                </p>
              </div>
            ))}
          </div>
        )}

        {showCreateForm && (
          <CreateUserCard
            onCreate={handleCreateUser}
            onCancel={() => setShowCreateForm(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default User;
