import { IProject, IProjectCreate, IProjectsResponse } from "../interface/projects";
import { api } from "./api.service";
import { AxiosError } from "axios";

export const ProjectService = {
  create: async (token: string, project: IProjectCreate): Promise<IProject> => {
    try {
      const response = await api.post<IProject>(
        "/session/project/createProject",
        project,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.message || "Falha ao criar projeto"
        );
      }
      throw new Error("Falha ao criar projeto");
    }
  },

  getAll: async (token: string): Promise<IProject[]> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await api.get("/session/project", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
  
      const projectsResponse: IProjectsResponse = {
        projects: response.data.project, 
      };
  
      return projectsResponse.projects;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.message || "Falha ao carregar projetos"
        );
      }
      throw new Error("Falha ao carregar projetos");
    }
  },
  
getById: async (token: string, projectId: number): Promise<IProject> => {
  try {
    const response = await api.get<{ project: IProject }>(`/session/project/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.project;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw new Error(error.response.data.message || "Falha ao carregar o projeto");
    }
    throw new Error("Falha ao carregar o projeto");
  }
},

  
  getBySquadId: async (token: string, squadId: number): Promise<IProject[]> => {
    try {
      const response = await api.get<IProjectsResponse>(`/session/project/squad/${squadId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.projects; 
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message || "Falha ao carregar projetos");
      }
      throw new Error("Falha ao carregar projetos");
    }
  },
  

};
