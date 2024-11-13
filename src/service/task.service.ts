import { ITask, ITaskCreate, ITasksResponse } from "../interface/task";
import { api } from "./api.service";
import { AxiosError } from "axios";

export const TaskService = {
  create: async (token: string, projectId: number, task: ITaskCreate): Promise<ITask> => {
    try {
      const response = await api.post<ITask>(
        `/session/project/${projectId}/tasks`,
        task,
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
          error.response.data.message || "Falha ao criar tarefa"
        );
      }
      throw new Error("Falha ao criar tarefa");
    }
  },

  getByProjectId: async (token: string, projectId: number): Promise<ITask[]> => {
    try {
      const response = await api.get<ITasksResponse>(`/session/project/${projectId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.tasks;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.message || "Falha ao carregar tarefas do projeto"
        );
      }
      throw new Error("Falha ao carregar tarefas do projeto");
    }
  },

  getByBacklogId: async (token: string, backlogId: number): Promise<ITask[]> => {
    try {
      const response = await api.get<ITasksResponse>(`/session/backlog/${backlogId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.tasks;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.message || "Falha ao carregar tarefas do backlog"
        );
      }
      throw new Error("Falha ao carregar tarefas do backlog");
    }
  },

  update: async (token: string, taskId: number, task: ITaskCreate): Promise<ITask> => {
    try {
      const response = await api.put<ITask>(`/session/tasks/${taskId}`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.message || "Falha ao atualizar tarefa"
        );
      }
      throw new Error("Falha ao atualizar tarefa");
    }
  },

  delete: async (token: string, taskId: number): Promise<void> => {
    try {
      await api.delete(`/session/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          error.response.data.message || "Falha ao deletar tarefa"
        );
      }
      throw new Error("Falha ao deletar tarefa");
    }
  },
};
