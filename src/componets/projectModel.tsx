import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { ISquad } from "../interface/squads";
import { SquadService } from "../service/squad.service";
import InputForm from "./Input";
import Notification from "./Notification"; 
import { IProjectCreate } from "../interface/projects";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (projectData: IProjectCreate) => void;
}

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [selectedSquad, setSelectedSquad] = useState<ISquad | null>(null);
  const [squads, setSquads] = useState<ISquad[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationType, setNotificationType] = useState<"success" | "error">("success");

  useEffect(() => {
    const fetchSquads = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("tokenSecurity");
        if (token) {
          const squadsData = await SquadService.getAllSquads(token);
          setSquads(squadsData);
        }
      } catch (err) {
        setNotificationMessage("Erro ao carregar squads.");
        setNotificationType("error");
        setNotificationVisible(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSquads();
  }, []);

  const handleCreate = async () => {
    if (projectName.trim() === "" || !selectedSquad) {
      return;
    }

    const projectData: IProjectCreate = {
      name: projectName,
      description: projectDescription,
      squad_id: selectedSquad.squad_id, 
    };

    setIsLoading(true);
    setNotificationVisible(false);

    try {
      await onCreate(projectData);
      setNotificationMessage("Projeto criado com sucesso!");
      setNotificationType("success");
      setNotificationVisible(true);

      // Limpa os campos
      setProjectName("");
      setProjectDescription("");
      setSelectedSquad(null);

      // Aguarda 2 segundos antes de fechar o modal
      setTimeout(() => {
        setNotificationVisible(false);
        onClose();
      }, 2000);
    } catch (error) {
      setNotificationMessage("Erro ao criar projeto.");
      setNotificationType("error");
      setNotificationVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-customBgLight p-6 rounded-lg shadow-lg w-3/4 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Criar Novo Projeto</h2>
        <div className="flex mb-4">
          <div className="flex-grow mr-2">
            <InputForm
              type="text"
              placeholder="Nome do Projeto"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <InputForm
            type="textarea"
            placeholder="Descrição do Projeto"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Selecionar Squad:</h3>
          <div className="max-h-40 overflow-y-auto">
            {isLoading ? (
              <div className="p-2 text-gray-500">Carregando squads...</div>
            ) : squads.length > 0 ? (
              squads.map((squad) => (
                <div
                  key={squad.squad_id}
                  className={`flex items-center justify-between p-3 border rounded mb-2 transition-all ${
                    selectedSquad?.squad_id === squad.squad_id
                      ? "bg-customBgLight4"
                      : "hover:bg-customBgLight3"
                  }`}
                  onClick={() => setSelectedSquad(squad)}
                >
                  <span className="flex-grow text-orange-700">{squad.name}</span>
                  {selectedSquad?.squad_id === squad.squad_id && (
                    <span className="ml-2">
                      <FaCheck className="text-orange-700" />{" "}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">Nenhuma squad encontrada</div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCreate}
            className="bg-orange-700 text-gray-100 p-2 rounded mr-2"
            disabled={projectName.trim() === "" || !selectedSquad}
          >
            {isLoading ? (
              <span className="flex items-center justify-center space-x-1">
                <span className="animate-bounce text-2xl">•</span>
                <span className="animate-bounce text-2xl">•</span>
                <span className="animate-bounce text-2xl">•</span>
              </span>
            ) : (
              "Criar Projeto"
            )}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancelar
          </button>
        </div>
        <Notification
          visible={notificationVisible}
          message={notificationMessage}
          type={notificationType}
        />
      </div>
    </div>
  ) : null;
};

export default CreateProjectModal;
