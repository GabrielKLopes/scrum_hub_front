import { useEffect, useState } from "react";
import { SquadService } from "../../service/squad.service";
import { ISquad, ISquadCreate } from "../../interface/squads";
import { UserService } from "../../service/users.service";
import Layout from "../../componets/Layout";
import CreateSquadModal from "../../componets/squadModal";
import { IUser } from "../../interface/user";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import Button from "../../componets/Button";

const Squads: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [squads, setSquads] = useState<ISquad[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [notificationVisible, setNotificationVisible] =
    useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");

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
        await SquadService.createSquad(token, squad);

        setNotificationMessage("Squad criada com sucesso!");
        setNotificationVisible(true);

        await fetchSquads();

        setTimeout(() => {
          setIsModalOpen(false);
          setNotificationVisible(false);
        }, 2000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar squad");
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
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-700 text-white px-4 py-2 w-1/6 rounded"
          >
            Criar Squad
          </Button>
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
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {squads.map((squad) => (
              <Link
              to={`/squads/${squad.squad_id}`} key={squad.squad_id}
                
              >
                <div className="border p-4 rounded-lg shadow-md flex flex-col items-center relative transform transition-transform duration-200 hover:scale-105">
                  <div
                    className="w-24 h-24 rounded-full bg-orange-700 flex items-center justify-center text-white text-3xl font-bold"
                    data-tooltip-id={`tooltip-squad-${squad.squad_id}`}
                    data-tooltip-content={squad.name}
                  >
                    {squad.name.charAt(0)}
                  </div>
                  {squad.name}
                  <Tooltip id={`tooltip-squad-${squad.squad_id}`} place="top" />

                  <div className="text-center flex flex-col items-center">
                    {squad.users.length > 0 ? (
                      <div className="flex space-x-2 mt-8">
                        {squad.users.slice(0, 3).map((user) => (
                          <div
                            key={user.user_id}
                            className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-sm"
                            data-tooltip-id={`tooltip-user-${user.user_id}`}
                            data-tooltip-content={user.name}
                          >
                            {user.name.charAt(0)}
                          </div>
                        ))}
                        {squad.users.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-sm">
                            +{squad.users.length - 3}
                          </div>
                        )}

                        {squad.users.map((user) => (
                          <Tooltip
                            key={user.user_id}
                            id={`tooltip-user-${user.user_id}`}
                            place="top"
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 mt-8">Não tem membros</p>
                    )}
                  </div>
                </div>
              </Link>
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
          .map((user) => ({
            user_id: user.user_id as number,
            name: user.name,
          }))}
      />

      {notificationVisible && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-md">
          {notificationMessage}
        </div>
      )}
    </Layout>
  );
};

export default Squads;
