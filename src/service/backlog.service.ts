import { IBacklog, IBacklogCreate, IBacklogsResponse } from "../interface/backlogs";
import { api } from "./api.service";
import { AxiosError } from "axios";

export const BacklogService = {
  create: async (token: string, backlog: IBacklogCreate): Promise<IBacklog> => {
    try {
      const response = await api.post<IBacklog>(
        "/session/backlog/createBacklog",
        backlog,
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
          error.response.data.message || "Falha ao criar backlog"
        );
      }
      throw new Error("Falha ao criar backlog");
    }
  },

  getAll: async (token: string): Promise<IBacklog[]> => {
    try {
      const response = await api.get<IBacklogsResponse>("/session/backlog", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.backlogs;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.message || "Falha ao carregar backlogs"
        );
      }
      throw new Error("Falha ao carregar backlogs");
    }
  },

  getById: async (token: string, backlogId: number): Promise<IBacklog> => {
    try {
      const response = await api.get<{ backlog: IBacklog }>(`/session/backlog/${backlogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.backlog;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message || "Falha ao carregar o backlog");
      }
      throw new Error("Falha ao carregar o backlog");
    }
  },

  getByProjectId: async (token: string, projectId: number): Promise<IBacklog[]> => {
    try {
      const response = await api.get<IBacklogsResponse>(`/session/project/${projectId}/backlogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.backlogs;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(error.response.data.message || "Falha ao carregar backlogs do projeto");
      }
      throw new Error("Falha ao carregar backlogs do projeto");
    }
  },
};
