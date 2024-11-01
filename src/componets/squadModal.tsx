import { useState } from "react";
import { CreateSquadModalProps, ISquadCreate } from "../interface/squads";
import { IUser } from "../interface/user";

const CreateSquadModal: React.FC<CreateSquadModalProps> = ({ isOpen, onClose, onCreate, users = [] }) => {
  const [squadName, setSquadName] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]); 

  const handleUserChange = (user: IUser) => {
    if (selectedUsers.some(selectedUser => selectedUser.user_id === user.user_id)) {
      setSelectedUsers(selectedUsers.filter(selectedUser => selectedUser.user_id !== user.user_id));
    } else {
      setSelectedUsers([...selectedUsers, user]); 
    }
  };

  const handleCreate = () => {
    if (squadName.trim() === "") {
      return; 
    }
    
    const squadData: ISquadCreate = {
      name: squadName,
      users: selectedUsers.length > 0 ? selectedUsers : [], 
    };
    
    onCreate(squadData);
    setSquadName("");
    setSelectedUsers([]);
  };

  return (
    isOpen ? (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Criar Nova Squad</h2>
          <input 
            type="text" 
            placeholder="Nome da Squad" 
            value={squadName}
            onChange={(e) => setSquadName(e.target.value)} 
            className="border rounded p-2 mb-4 w-full"
          />
          <div className="mb-4">
            <h3 className="font-semibold">Selecionar Usuários:</h3>
            {users.map(user => (
              <div key={user.user_id}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={selectedUsers.some(selectedUser => selectedUser.user_id === user.user_id)}
                    onChange={() => handleUserChange(user)} 
                  />
                  {user.name}
                </label>
              </div>
            ))}
          </div>
          <button 
            onClick={handleCreate} 
            className="bg-blue-500 text-white p-2 rounded" 
            disabled={squadName.trim() === ""} 
          >
            Criar Squad
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded ml-2">Cancelar</button>
        </div>
      </div>
    ) : null
  );
};

export default CreateSquadModal;
