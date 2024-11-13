import React, { useEffect, useState } from "react";
import { IUser } from "../../interface/user";
import { UserService } from "../../service/users.service";
import { useNavigate } from "react-router-dom";
import Button from "../../componets/Button";
import Layout from "../../componets/Layout";
import Modal from "../../componets/Modal";
import Notification from "../../componets/Notification";
import { FaTrash } from "react-icons/fa";

const User: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [, setActionMenuOpen] = useState<number | null>(null);
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [notificationVisible, setNotificationVisible] =
    useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("tokenSecurity");
      if (token) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
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

  const handleDeleteUser = async (userId: number) => {
    const token = localStorage.getItem("tokenSecurity");
    if (token) {
      setIsDeleting(true);
      try {
        await UserService.deleteUser(token, userId);
        setUsers(users.filter((user) => user.user_id !== userId));
        setIsModalOpen(false);
        setActionMenuOpen(null);
        setNotificationMessage("Usuário deletado com sucesso!");
        setNotificationType("success");
        setNotificationVisible(true);
        setTimeout(() => setNotificationVisible(false));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setIsDeleting(false);
      }
    }
  };
  const openModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
    setActionMenuOpen(null);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <div className="p-6 h-full w-full flex flex-col">
        <div className="flex justify-between mt-5 mb-5">
          <h1 className="text-2xl font-semibold text-orange-700">Usuários</h1>
          <Button
            className="text-lg font-semibold text-center w-auto h-auto bg-orange-700 text-white rounded-lg hover:bg-orange-700"
            onClick={() => navigate("/create-user")}
          >
            Criar Usuário
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
        ) : users.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-lg">Nenhum usuário cadastrado</p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4">
            {users.map((user) => (
              <div
                key={user.user_id}
                onClick={() => navigate(`/details-user/${user.user_id}`)}
                className="p-4 rounded-lg cursor-pointer shadow-xl bg-customBgLight3 transition-transform duration-150 transform hover:scale-x-95 hover:border-orange-700 border border-transparent relative"
              >
                <div className="w-12 h-12 bg-orange-700 rounded-full flex-shrink-0 flex items-center justify-center text-lg text-white font-semibold mr-4">
                {user.name?.charAt(0) || ""}
                </div>
                <div className="flex flex-col text-left">
                  <p className="font-semibold text-2xl text-orange-600">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-700">
                    {user.permissionUser
                      ? user.permissionUser.name
                      : "Sem Permissão"}
                  </p>
                </div>
                <div className="absolute top-4 right-4">
                  <FaTrash
                    className="text-orange-700 h-5 w-5"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(user.user_id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={() => {
          if (selectedUserId !== null) {
            handleDeleteUser(selectedUserId);
          }
        }}
        message="Você tem certeza que deseja deletar este usuário?"
        isDeleting={isDeleting}
      />

      <Notification
        visible={notificationVisible}
        message={notificationMessage}
        type={notificationType}
      />
    </Layout>
  );
};

export default User;
