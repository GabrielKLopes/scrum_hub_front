import { useEffect, useState } from "react";
import { SquadService } from "../../service/squad.service";
import { ISquad, ISquadCreate } from "../../interface/squads";
import { UserService } from "../../service/users.service";
import Layout from "../../componets/Layout";
import CreateSquadModal from "../../componets/squadModal";
import { IUser } from "../../interface/user";

const Squads: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [squads, setSquads] = useState<ISquad[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchSquads = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("tokenSecurity");
      if (token) {
        const squadData = await SquadService.getAllSquads(token);
        setSquads(squadData);
      } else {
        throw new Error("Token de autenticação não encontrado");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("tokenSecurity");
      if (token) {
        const userData = await UserService.getAll(token);
        const mappedUsers = userData.map((user) => ({
          ...user,
          id: user.user_id,
        }));
        setUsers(mappedUsers);
      }
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }
  };

  const handleCreateSquad = async (squad: ISquadCreate) => {
    try {
      const token = localStorage.getItem("tokenSecurity");
      if (token) {
        const newSquad = await SquadService.createSquad(token, squad);
        setSquads((prevSquads) => [...prevSquads, newSquad]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar squad");
    } finally {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    fetchSquads();
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className="p-6 h-full w-full flex flex-col">
        <div className="flex justify-between mt-5 mb-5">
          <h1 className="text-2xl font-semibold text-orange-700">Squads</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Criar Squad
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="flex space-x-2 text-4xl text-orange-600">
              <span className="animate-wave-1">•</span>
              <span className="animate-wave-2">•</span>
              <span className="animate-wave-3">•</span>
            </span>
          </div>
        ) : error ? (
          <p className="text-red-500">Erro: {error}</p>
        ) : squads.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-lg">Nenhuma Squad Cadastrada</p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4">
            {squads.map((squad) => (
              <div
                key={squad.squad_id}
                className="border p-4 rounded-lg shadow-md relative"
              >
                <div className="flex flex-col text-left">
                  <p className="font-semibold text-2xl text-orange-600">
                    {squad.name}
                  </p>
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold">Membros:</h3>
                    {squad.users && squad.users.length > 0 ? (
                      squad.users.map((user) => (
                        <p key={user.user_id} className="text-gray-700">
                          {user.name}
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-500">Nenhum membro na squad</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateSquadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateSquad}
        users={users
            .filter((user) => user.user_id !== undefined) 
            .map((user) => ({ user_id: user.user_id as number, name: user.name })) 
          }
          
      />
    </Layout>
  );
};

export default Squads;
