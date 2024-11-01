import { IUser } from "./user";

export interface ISquad {
    squad_id: number; 
    name: string;
    createdBy: {
      user_id: number; 
      name: string; 
    };
    created_at: string;
    users: IUser[]
  }
  
export interface ISquadCreate{
  name: string;
  users?: IUser[]
}

export interface CreateSquadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (squad: ISquadCreate) => void;
  users?: { user_id: number; name: string }[]; 
}
