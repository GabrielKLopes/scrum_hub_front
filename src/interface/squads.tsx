export interface ISquad {
    squad_id: number; 
    name: string;
    createdBy: {
      user_id: number; 
      name: string; 
    };
    created_at: string;
  }
  