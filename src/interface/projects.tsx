
export interface IProjectCreate {
    name: string;         
    description: string; 
    squad_id: number;     
  }

  export interface IProject {
    project_id: number;
    squad_id: number; 
    name: string;
    description: string;
    created_at: string;
  }

  export interface IProjectsResponse {
    projects: IProject[];
  }

