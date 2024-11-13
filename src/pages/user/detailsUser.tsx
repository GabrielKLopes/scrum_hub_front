import React, { useEffect, useState } from "react";
import { IUser, IUserUpdate } from "../../interface/user";
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
  const [squads, setSquads] = useState<ISquad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [openSelectId, setOpenSelectId] = useState<number | null>(null);
  const [notificationVisible, setNotificationVisible] =
    useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updatedFields, setUpdatedFields] = useState<Partial<IUser>>({});

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("tokenSecurity") || "";

      if (token && id) {
        const userData = await UserService.getById(token, parseInt(id));
        if (userData && "user" in userData) {
          setUser(userData.user as IUser);
        } else if (userData) {
          setUser(userData as IUser);
        } else {
          throw new Error("Dados do usuário não encontrados");
        }

        const squadsData = await SquadService.getAllSquads(token);
        setSquads(squadsData);
      } else {
        throw new Error(
          "Token de autenticação ou ID de usuário não encontrado"
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
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
        updatedUser.squad = {
          ...updatedUser.squad,
          squad_id: value,
        };
        setUpdatedFields((prev) => ({ ...prev, squad_id: value }));
        break;

      case "permission":
        updatedUser.permission = {
          ...updatedUser.permission,
          permission_id: value,
          name: "",
        };
        setUpdatedFields((prev) => ({ ...prev, permission_id: value }));
        break;

      case "permissionUser":
        updatedUser.permissionUser = {
          ...updatedUser.permissionUser,
          permissionUser_id: value,
          name: "",
        };
        setUpdatedFields((prev) => ({ ...prev, permissionUser_id: value }));
        break;

      default:
        break;
    }

    setUser(updatedUser);
  };

  const handleInputChange = (field: keyof IUser, value: string) => {
    if (!user) return;

    setUser((prevUser) => (prevUser ? { ...prevUser, [field]: value } : null));
    setUpdatedFields((prev) => ({ ...prev, [field]: value }));
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

      const payload: IUserUpdate = {
        ...updatedFields,
        permission: updatedFields.permission?.permission_id
          ? { permission_id: updatedFields.permission.permission_id }
          : undefined,
        permissionUser: updatedFields.permissionUser?.permissionUser_id
          ? {
              permissionUser_id: updatedFields.permissionUser.permissionUser_id,
            }
          : undefined,
      };

      const response = await UserService.updateUser(
        token,
        user.user_id,
        payload
      );

      setUser(response);
      setUpdatedFields({});

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
                isLoading ? (
                  <span className="flex items-center justify-center space-x-1">
                    <span className="animate-bounce text-2xl">•</span>
                    <span className="animate-bounce text-2xl">•</span>
                    <span className="animate-bounce text-2xl">•</span>
                  </span>
                ) : (
                  "Salvar"
                )
              ) : (
                "Editar"
              )}
            </button>
            <div className="w-16 h-16 bg-orange-700 rounded-full flex-shrink-0 flex items-center justify-center text-2xl text-customBgLight3 shadow-lg font-semibold mr-4">
              {user.name?.charAt(0) || ""}
            </div>
            <h2 className="text-xl font-semibold text-orange-600 mr-4">
              {user.name}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputForm
              label="Nome"
              value={user.name || ""}
              onChange={(e) => handleInputChange("name", e.target.value)}
              type="text"
              readOnly={!isEditing}
            />
            <InputForm
              label="Email"
              value={user.email || ""}
              onChange={(e) => handleInputChange("email", e.target.value)}
              type="email"
              readOnly={!isEditing}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <SelectForm
              id={1}
              value={user?.squad?.squad_id ?? undefined}
              options={squadOptions}
              onChange={(value) => handleSelectChange("squad", value)}
              label="Squad"
              readOnly={true}
              isOpen={openSelectId === 1}
              setOpenId={(open) => setOpenSelectId(open ? 1 : null)}
              disabled={true}
            />

            <SelectForm
              id={2}
              value={user.permission?.permission_id || 0}
              options={permissionOptions}
              onChange={(value) => handleSelectChange("permission", value)}
              label="Permissão"
              readOnly={!isEditing}
              isOpen={openSelectId === 2}
              setOpenId={(open) => setOpenSelectId(open ? 2 : null)}
            />
            <SelectForm
              id={3}
              value={user.permissionUser?.permissionUser_id || 0}
              options={permissionUserOptions}
              onChange={(value) => handleSelectChange("permissionUser", value)}
              label="Permissão do Usuário"
              readOnly={!isEditing}
              isOpen={openSelectId === 3}
              setOpenId={(open) => setOpenSelectId(open ? 3 : null)}
            />
          </div>
        </>
      ) : (
        <p className="text-gray-700">Usuário não encontrado</p>
      )}
      <Notification
        visible={notificationVisible}
        type={notificationType}
        message={notificationMessage}
        onClose={() => setNotificationVisible(false)}
      />
    </Layout>
  );
};

export default DetailsUser;
