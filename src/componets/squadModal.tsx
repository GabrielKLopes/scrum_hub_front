import { useState } from "react";
import { CreateSquadModalProps, ISquadCreate } from "../interface/squads";
import { IUser } from "../interface/user";
import InputForm from "./Input";
import { FaCheck } from "react-icons/fa";
import Notification from "./Notification";

const CreateSquadModal: React.FC<CreateSquadModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  users = [],
}) => {
  const [squadName, setSquadName] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationType, setNotificationType] = useState<"success" | "error">("success");

  const handleUserChange = (user: IUser) => {
    if (selectedUsers.some((selectedUser) => selectedUser.user_id === user.user_id)) {
      setSelectedUsers(selectedUsers.filter((selectedUser) => selectedUser.user_id !== user.user_id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleCreate = async () => {
    if (squadName.trim() === "") {
      return;
    }

    const squadData: ISquadCreate = {
      name: squadName,
      users: selectedUsers.length > 0 ? selectedUsers : [],
    };

    setIsLoading(true);
    setNotificationVisible(false);

    try {
      await onCreate(squadData);
      setNotificationMessage("Squad criada com sucesso!");
      setNotificationType("success");
      setNotificationVisible(true);

      setSquadName("");
      setSelectedUsers([]);
      setSearchTerm("");

      setTimeout(() => {
        setNotificationVisible(false);
        onClose();
      }, 2000);
    } catch (error) {
      setNotificationMessage("Erro ao criar squad.");
      setNotificationType("error");
      setNotificationVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-customBgLight p-6 rounded-lg shadow-lg w-3/4 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Criar Nova Squad</h2>
        <div className="flex mb-4">
          <div className="flex-grow mr-2">
            <InputForm
              type="text"
              placeholder="Nome da Squad"
              value={squadName}
              onChange={(e) => setSquadName(e.target.value)}
            />
          </div>
          <div className="flex-grow">
            <InputForm
              type="text"
              placeholder="Pesquisar Usuário"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Selecionar Usuários:</h3>
          <div className="max-h-40 overflow-y-auto">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.user_id}
                  className={`flex items-center justify-between p-3 border rounded mb-2 transition-all ${
                    selectedUsers.some((selectedUser) => selectedUser.user_id === user.user_id)
                      ? "bg-customBgLight4"
                      : "hover:bg-customBgLight3"
                  }`}
                  onClick={() => handleUserChange(user)}
                >
                  <span className="flex-grow text-orange-700">{user.name}</span>
                  {selectedUsers.some((selectedUser) => selectedUser.user_id === user.user_id) && (
                    <span className="ml-2">
                      <FaCheck className="text-orange-700" />{" "}
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">Nenhum usuário encontrado</div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleCreate}
            className="bg-orange-700 text-gray-100 p-2 rounded mr-2"
            disabled={squadName.trim() === ""}
          >
            {isLoading ? (
              <span className="flex items-center justify-center space-x-1">
                <span className="animate-bounce text-2xl">•</span>
                <span className="animate-bounce text-2xl">•</span>
                <span className="animate-bounce text-2xl">•</span>
              </span>
            ) : (
              "Criar Squad"
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

export default CreateSquadModal;
