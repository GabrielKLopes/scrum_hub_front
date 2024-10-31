import React, { useEffect, useState } from "react";
import { IUser } from "../../interface/user";
import { UserService } from "../../service/users.service";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../componets/Layout";
import InputForm from "../../componets/Input";
import SelectForm from "../../componets/SelectForm";
import { FaArrowLeft } from "react-icons/fa";
import { Permission, PermissionUser } from "../../enum/permission.enum";
import { ISquad } from "../../interface/squads";
import { SquadService } from "../../service/squad.service";
import Notification from "../../componets/Notification";

const DetailsUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [openSelectId, setOpenSelectId] = useState<number | null>(null);
  const [squads, setSquads] = useState<ISquad[]>([]);
  const [notificationVisible, setNotificationVisible] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationType, setNotificationType] = useState<"success" | "error">("success");
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    const fetchSquads = async () => {
      try {
        const token = localStorage.getItem("tokenSecurity") || "";
        const squadsData = await SquadService.getAllSquads(token);
        setSquads(squadsData);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro desconhecido");
      }
    };
    fetchSquads();
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSelectChange = (field: string, value: number) => {
    if (!user) return;

    const updatedUser = { ...user };

    switch (field) {
      case "squad":
        // eslint-disable-next-line no-case-declarations
        const selectedSquad = squads.find(squad => squad.squad_id === value);
        updatedUser.squad = {
          ...updatedUser.squad,
          squad_id: value,
          name: selectedSquad ? selectedSquad.name : updatedUser.squad.name
        };
        break;
      case "permission":
        updatedUser.permission.permission_id = value;
        updatedUser.permission.name = permissionOptions.find(option => option.value === value)?.label || updatedUser.permission.name;
        break;
      case "permissionUser":
        updatedUser.permissionUser.permissionUser_id = value;
        updatedUser.permissionUser.name = permissionUserOptions.find(option => option.value === value)?.label || updatedUser.permissionUser.name;
        break;
      default:
        break;
    }

    setUser(updatedUser); 
  };

  const handleSave = async () => {
    if (!user) {
      setNotificationMessage("Usuário não encontrado.");
      setNotificationType("error");
      setNotificationVisible(true);
      return;
    }

    setIsLoading(true); 
    setNotificationVisible(false);

    try {
      const token = localStorage.getItem("tokenSecurity") || "";
      const updatedUserData = {
        ...user,
        squad: {
          ...user.squad,
          squad_id: user.squad.squad_id
        },
        permission: {
          ...user.permission,
          permission_id: user.permission.permission_id
        },
        permissionUser: {
          ...user.permissionUser,
          permissionUser_id: user.permissionUser.permissionUser_id
        }
      };

      await UserService.updateUser(token, user.id, updatedUserData);

      setNotificationMessage("Usuário atualizado com sucesso!");
      setNotificationType("success");
      setNotificationVisible(true);
      setTimeout(() => navigate(-1), 2000);
    } catch (error) {
      setNotificationMessage(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao atualizar usuário"
      );
      setNotificationType("error");
      setNotificationVisible(true);
    } finally {
      setIsLoading(false); 
    }
  };

  const permissionUserOptions = Object.keys(PermissionUser)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key.replace(/_/g, " ").toLowerCase(),
      value: PermissionUser[key as keyof typeof PermissionUser],
    }));

  const permissionOptions = Object.keys(Permission)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key.replace(/_/g, " ").toLowerCase(),
      value: Permission[key as keyof typeof Permission],
    }));

  const squadOptions = squads.map((squad) => ({
    label: squad.name,
    value: squad.squad_id,
  }));

  return (
    <Layout>
      <div className="flex items-center mb-4 gap-5 overflow-hidden">
        <FaArrowLeft
          onClick={handleGoBack}
          className="text-orange-700 mt-10 h-5 cursor-pointer w-5"
        />
        <h2 className="text-2xl text-orange-700 font-semibold text-left mt-10">
          Detalhes do Usuário
        </h2>
      </div>

      {loading ? (
        <div className="text-xl text-gray-700">Carregando...</div>
      ) : error ? (
        <p className="text-red-700">Erro: {error}</p>
      ) : user ? (
        <>
          <div className="flex items-center justify-center mb-4 flex-col">
          <button
            onClick={isEditing ? handleSave : handleEditToggle}
            className="ml-auto text-white bg-orange-700 hover:bg-orange-700 font-semibold py-2 px-4 rounded mr-5 w-40"
          >
            {isEditing ? (
              <>
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-1">
                    <span className="animate-bounce text-2xl">•</span>
                    <span className="animate-bounce text-2xl">•</span>
                    <span className="animate-bounce text-2xl">•</span>
                  </span>
                ) : (
                  "Salvar"
                )}
              </>
            ) : (
              "Editar"
            )}
          </button>
            <div className="w-16 h-16 bg-orange-700 rounded-full flex-shrink-0 flex items-center justify-center text-2xl text-customBgLight3 shadow-lg font-semibold mr-4">
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
              <h2 className="text-xl font-semibold text-orange-600 mr-4">
                {user.name}
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputForm
              label="Nome"
              value={user.name || ""}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              type="text"
              readOnly={!isEditing}
            />
            <InputForm
              label="Email"
              value={user.email || ""}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              readOnly={!isEditing}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <SelectForm
              id={1}
              value={user.squad ? user.squad.squad_id : 0}
              onChange={(value) => handleSelectChange("squad", value)}
              label="Squad"
              options={squadOptions}
              isOpen={openSelectId === 1}
              setOpenId={setOpenSelectId}
              readOnly={!isEditing}
            />
            <SelectForm
              id={2}
              value={user.permission ? user.permission.permission_id : 0}
              onChange={(value) => handleSelectChange("permission", value)}
              label="Função"
              options={permissionOptions}
              isOpen={openSelectId === 2}
              setOpenId={setOpenSelectId}
              readOnly={!isEditing}
            />
            <SelectForm
              id={3}
              value={user.permissionUser ? user.permissionUser.permissionUser_id : 0}
              onChange={(value) => handleSelectChange("permissionUser", value)}
              label="Tipo de Permissão"
              options={permissionUserOptions}
              isOpen={openSelectId === 3}
              setOpenId={setOpenSelectId}
              readOnly={!isEditing}
            />
          </div>
        </>
      ) : (
        <p className="text-red-700">Usuário não encontrado</p>
      )}
      <Notification
        visible={notificationVisible}
        message={notificationMessage}
        type={notificationType}
      />
    </Layout>
  );
};

export default DetailsUser;
