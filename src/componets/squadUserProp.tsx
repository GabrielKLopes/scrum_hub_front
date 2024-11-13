import React, { useState } from "react";
import { IUser } from "../interface/user";
import Notification from "./Notification"; 

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: IUser[];
  onAddUser: (userId: number) => void; 
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, users, onAddUser }) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const [notificationVisible, setNotificationVisible] = useState(false); 
  const [notificationMessage, setNotificationMessage] = useState(""); 
  const [notificationType, setNotificationType] = useState<"success" | "error">("success"); 

  if (!isOpen) return null;

  const handleUserClick = (userId: number) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null);
    } else {
      setSelectedUserId(userId);
    }
  };

  const handleAddUser = async () => {
    if (selectedUserId !== null) {
      setIsLoading(true); 
      try {
        await onAddUser(selectedUserId);
        setNotificationMessage("Usuário adicionado com sucesso!");
        setNotificationType("success");
      } catch (error) {
        setNotificationMessage("Erro ao adicionar o usuário.");
        setNotificationType("error");
      } finally {
        setNotificationVisible(true);
        setTimeout(() => {
          onClose();
          setNotificationVisible(false);
        }, 1000); 
        setIsLoading(false); 
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-1/3">
        <h2 className="text-lg font-semibold text-orange-700">Adicionar Membro</h2>
        <ul>
          {users.map(user => (
            <li
              key={user.user_id}
              className={`flex flex-col border-b py-2 cursor-pointer transition-all rounded-lg ${

                selectedUserId === user.user_id
                  ? "bg-customBgLight2" 
                  : "hover:bg-customBgLight3"
              }`}
              onClick={() => handleUserClick(user.user_id)} 
            >
              <div className="ml-5 flex flex-col">
              <span className="font-semibold text-orange-600">{user.name}</span>
              <span className="">{user.permissionUser?.name}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddUser}
            className="bg-orange-700 text-gray-100 p-2 rounded"
            disabled={selectedUserId === null || isLoading} 
          >
            {isLoading ? (
              <span className="flex items-center justify-center space-x-1">
                <span className="animate-bounce text-2xl">•</span>
                <span className="animate-bounce text-2xl">•</span>
                <span className="animate-bounce text-2xl">•</span>
              </span>
            ) : (
              'Adicionar'
            )}
          </button>
          <button onClick={onClose} className="ml-2 bg-gray-200 px-4 py-2 rounded">
            Fechar
          </button>
        </div>
      </div>
      <Notification visible={notificationVisible} message={notificationMessage} type={notificationType} />
    </div>
  );
};

export default UserModal;
