import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../componets/Button";
import Layout from "../../componets/Layout";
import SelectForm from "../../componets/SelectForm";
import InputForm from "../../componets/Input";
import Notification from "../../componets/Notification";
import { PermissionUser, Permission } from "../../enum/permission.enum";
import { ISquad } from "../../interface/squads";
import { IUserCreate } from "../../interface/user";
import { SquadService } from "../../service/squad.service";
import { UserService } from "../../service/users.service";

const CreateUserPage: React.FC = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState<IUserCreate>({
    name: "",
    email: "",
    password: "",
    permissionUser_id: 0,
    permission_id: 0,
    squad_id: 0,
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [squads, setSquads] = useState<ISquad[]>([]);
  const [notificationVisible, setNotificationVisible] =
    useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [notificationType, setNotificationType] = useState<"success" | "error">(
    "success"
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSelectId, setOpenSelectId] = useState<number | null>(null);

  useEffect(() => {
    const fetchSquads = async () => {
      try {
        const token = localStorage.getItem("tokenSecurity") || "";
        const squadsData = await SquadService.getAllSquads(token);
        setSquads(squadsData);
      } catch (error) {
        setFormError(
          error instanceof Error ? error.message : "Erro desconhecido"
        );
      }
    };
    fetchSquads();
  }, []);

  const handleSave = async () => {
    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.password ||
      newUser.permissionUser_id === 0 ||
      newUser.permission_id === 0 ||
      newUser.squad_id === 0
    ) {
      setFormError("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);
    setFormError(null);
    setNotificationVisible(false);

    try {
      const token = localStorage.getItem("tokenSecurity") || "";
      await UserService.createUser(token, newUser);
      setNotificationMessage("Usuário criado com sucesso!");
      setNotificationType("success");
      setNotificationVisible(true);
      setTimeout(() => navigate("/users"), 2000);
    } catch (error) {
      setNotificationMessage(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao criar usuário"
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
      <div className="p-4 min-h-full">
        <h2 className="text-2xl text-orange-700 font-semibold mb-4 text-left mt-10">
          Novo Usuário
        </h2>
        {formError && (
          <p className="text-red-700 mb-4 text-center">{formError}</p>
        )}

        <Notification
          visible={notificationVisible}
          message={notificationMessage}
          type={notificationType}
        />

        <div className="flex justify-center items-center h-full mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full ">
            <InputForm
              type="text"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              placeholder="Nome"
              label="Nome"
            />
            <InputForm
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              placeholder="Email"
              label="Email"
            />
            <InputForm
              type="password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              placeholder="Senha"
              label="Senha"
            />
            <SelectForm
              id={1}
              label="Permissão do Usuário"
              value={newUser.permissionUser_id}
              onChange={(selectedValue) =>
                setNewUser({ ...newUser, permissionUser_id: selectedValue })
              }
              options={permissionUserOptions}
              isOpen={openSelectId === 1}
              setOpenId={setOpenSelectId}
            />
            <SelectForm
              id={2}
              label="Permissão"
              value={newUser.permission_id}
              onChange={(selectedValue) =>
                setNewUser({ ...newUser, permission_id: selectedValue })
              }
              options={permissionOptions}
              isOpen={openSelectId === 2}
              setOpenId={setOpenSelectId}
            />
            <SelectForm
              id={3}
              label="Squad"
              value={newUser.squad_id}
              onChange={(selectedValue) =>
                setNewUser({ ...newUser, squad_id: selectedValue })
              }
              options={squadOptions}
              isOpen={openSelectId === 3}
              setOpenId={setOpenSelectId}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-4 mt-6 justify-center">
          <Button
            onClick={handleSave}
            className="bg-customBgLight4 border border-transparent text-orange-700 rounded-lg p-2 w-full md:w-auto hover:border-orange-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center space-x-1">
                <span className="animate-bounce text-2xl">•</span>
                <span className="animate-bounce text-2xl">•</span>
                <span className="animate-bounce text-2xl">•</span>
              </span>
            ) : (
              "Salvar"
            )}
          </Button>

          <Button
            onClick={() => navigate("/users")}
            className="bg-customBgLight4 border text-red-700 rounded-lg p-2 w-full md:w-auto hover:border-red-700"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CreateUserPage;
