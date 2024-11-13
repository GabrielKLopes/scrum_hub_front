import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SquadService } from "../../service/squad.service";
import { UserService } from "../../service/users.service"; 
import { ISquad } from "../../interface/squads";
import { IUser } from "../../interface/user";
import { IProject } from "../../interface/projects";
import Layout from "../../componets/Layout";
import UserModal from "../../componets/squadUserProp";
import { ProjectService } from "../../service/project";

const DetailSquad: React.FC = () => {
  const { squadId } = useParams<{ squadId: string }>();
  const [squad, setSquad] = useState<ISquad | null>(null);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [usersNotInSquad, setUsersNotInSquad] = useState<IUser[]>([]);
  const navigate = useNavigate();

  const fetchDetails = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("tokenSecurity");
      if (token && squadId) {
        const squadData = await SquadService.getSquadById(token, parseInt(squadId));
        setSquad(squadData);

        const projectsData = await ProjectService.getBySquadId(token, parseInt(squadId));

        setProjects(projectsData);

        const users = await UserService.getAll(token);
        const usersInSquad = squadData.users?.map(user => user.user_id) || [];
        setUsersNotInSquad(users.filter(user => !usersInSquad.includes(user.user_id)));
      } else {
        throw new Error("Token de autenticação não encontrado ou ID da squad inválido");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao buscar detalhes da squad");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [squadId]);

  const handleAddUser = async (userId: number) => {
    try {
      const token = localStorage.getItem("tokenSecurity");
      if (token) {
        if (!squadId) {
          throw new Error("squadId não está definido");
        }

        const userData = { squad: { squad_id: Number(squadId) } };

        await UserService.updateUser(token, userId, userData);

        fetchDetails();
      }
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
    }
  };

  return (
    <Layout>
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
      ) : squad ? (
        <div className="flex flex-col items-center h-[90%]">
          <div className="w-full mr-4 h-full">
            <div className="p-6 mt-4 w-full h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-orange-700">Squad</h1>
                <div className="flex space-x-4">
                  {["overview", "projects", "members"].map(tab => (
                    <div
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`border-b-2 cursor-pointer transition-all duration-200 
                                  ${activeTab === tab ? "border-orange-500" : "border-transparent"} 
                                  hover:border-orange-300 flex-grow text-center`}
                    >
                      <h3 className="text-lg font-semibold text-orange-700">{tab === "overview" ? "Visão Geral" : tab === "projects" ? "Projetos" : "Membros"}</h3>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-grow overflow-y-auto mt-4">
                {activeTab === "overview" && (
                  <div>
                    <h1 className="text-4xl font-semibold text-orange-500">{squad?.name || "Nome da Squad"}</h1>
                    <p>Total de Membros: {squad?.users?.length || 0}</p>
                  </div>
                )}
                {activeTab === "projects" && (
  <div>
    <h2 className="text-2xl font-semibold text-orange-500">Projetos</h2>
    <div className="grid grid-cols-1 gap-4 mt-4">
      {projects && projects.length > 0 ? (
        projects.map((project, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
            <h3 className="font-semibold text-lg text-orange-700">{project.name}</h3>
            <p className="text-gray-500">Descrição: {project.description}</p>
            <p className="text-gray-500">Data de Criação: {new Date(project.created_at).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>Nenhum projeto encontrado para essa squad.</p>
      )}
    </div>
  </div>
)}
                {activeTab === "members" && (
                  <div>
                    <h1 className="text-lg font-semibold text-orange-500">Membros:</h1>
                    <button
                      onClick={() => setIsUserModalOpen(true)}
                      className="bg-orange-700 text-white px-4 py-2 rounded mb-4"
                    >
                      Adicionar Membro
                    </button>
                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
                      {squad?.users?.length > 0 ? (
                        squad.users.map(user => (
                          <div
                            key={user.user_id}
                            onClick={() => navigate(`/details-user/${user.user_id}`)}
                            className="p-4 border ml-5 rounded-lg shadow-lg bg-white flex flex-col justify-between cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl"
                          >
                            <h2 className="font-semibold text-xl text-orange-700">
                              {user.name || "Nome não disponível"}
                            </h2>
                            <p className="text-gray-500">
                              {user.permissionUser?.name || "Sem Permissão"}
                            </p>
                            <p className="text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p>Nenhum membro encontrado.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Squad não encontrada.</p>
      )}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        users={usersNotInSquad}
        onAddUser={handleAddUser} 
      />
    </Layout>
  );
};

export default DetailSquad;
