
export interface ITask {
  id: number;
  name: string;
  description: string;
  
}

export interface IBacklog {
  backlog_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  project: {
    project_id: number;
    name: string;
  };
  tasks: ITask[]; 
}

export interface IBacklogCreate {
  name: string;
  project_id: number;
}

export interface IBacklogsResponse {
  backlogs: IBacklog[];
}
