import React, { useEffect, useState } from 'react';
import SelectForm from './SelectForm';
import { ISquad } from '../interface/squads';
import { PermissionUser, Permission } from '../enum/permission.enum';
import { SquadService } from '../service/squad.service';
import Button from './Button';
import { IUserCreate } from '../interface/user';

interface CreateUserCardProps {
  onCreate: (userData: IUserCreate) => void;
  onCancel: () => void;
}

const CreateUserCard: React.FC<CreateUserCardProps> = ({ onCreate, onCancel }) => {
  const [newUser, setNewUser] = useState<IUserCreate>({
    name: '',
    email: '',
    password: '',
    permissionUser_id: 0,
    permission_id: 0,
    squad_id: 0,
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [squads, setSquads] = useState<ISquad[]>([]);

  useEffect(() => {
    const fetchSquads = async () => {
      try {
        const token = localStorage.getItem('tokenSecurity') || '';
        const squadsData = await SquadService.getAllSquads(token);
        setSquads(squadsData);
      } catch (error) {
        setFormError(error instanceof Error ? error.message : 'Erro desconhecido');
      }
    };
    fetchSquads();
  }, []);

  const handleSave = () => {
    if (
      newUser.permissionUser_id === 0 ||
      newUser.permission_id === 0 ||
      newUser.squad_id === 0
    ) {
      setFormError("Por favor, selecione todas as opções.");
      return;
    }

    onCreate(newUser);
  };

  const permissionUserOptions = Object.keys(PermissionUser)
  .filter(key => isNaN(Number(key))) // Ignora os valores numéricos
  .map(key => ({
    label: key.replace(/_/g, ' ').toLowerCase(),
    value: PermissionUser[key as keyof typeof PermissionUser],
  }));

// Obtém apenas as labels de Permission
const permissionOptions = Object.keys(Permission)
  .filter(key => isNaN(Number(key))) // Ignora os valores numéricos
  .map(key => ({
    label: key.replace(/_/g, ' ').toLowerCase(),
    value: Permission[key as keyof typeof Permission],
  }));

  const squadOptions = squads.map((squad) => ({
    label: squad.name,
    value: squad.squad_id,
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Novo Usuário</h2>
        {formError && <p className="text-red-500 mb-2">{formError}</p>}
        <input
          type="text"
          placeholder="Nome"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          className="w-full mb-4 p-2 border rounded"
        />
       <SelectForm
  label="Permissão do Usuário"
  value={newUser.permissionUser_id}
  onChange={(e) => setNewUser({ ...newUser, permissionUser_id: Number(e.target.value) })}
  options={permissionUserOptions}
/>
<SelectForm
  label="Permissão"
  value={newUser.permission_id}
  onChange={(e) => setNewUser({ ...newUser, permission_id: Number(e.target.value) })}
  options={permissionOptions}
/>
<SelectForm
  label="Squad"
  value={newUser.squad_id}
  onChange={(e) => setNewUser({ ...newUser, squad_id: Number(e.target.value) })}
  options={squadOptions}
/>
        <Button onClick={handleSave} className="w-full bg-orange-600 text-white rounded-lg hover:bg-orange-700 p-2 mb-2">
          Salvar
        </Button>
        <Button onClick={onCancel} className="w-full bg-gray-400 text-white rounded-lg hover:bg-gray-500 p-2">
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default CreateUserCard;
