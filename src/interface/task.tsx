
export interface ITask {
    id: number;
    name: string;
    description: string;
    status: string;
    priority: string;
    
  }
  
  export interface ITaskCreate {
    name: string;
    description: string;
    status_id: number;
    priority_id: number;
  }
  
  export interface ITasksResponse {
    tasks: ITask[];
  }
  