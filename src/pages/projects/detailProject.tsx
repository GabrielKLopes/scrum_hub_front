import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../componets/Layout";
import { ProjectService } from "../../service/project";
import { IProject } from "../../interface/projects";
import { IBacklogCreate, IBacklog } from "../../interface/backlogs";
import Kanban from "../../componets/kanban";
import { BacklogService } from "../../service/backlog.service";
import UnderDevelopment from "../../componets/underDevelopment";

const DetailProject: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<IProject | null>(null);
  const [backlogs, setBacklogs] = useState<IBacklog[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreatingBacklog, setIsCreatingBacklog] = useState<boolean>(false);
  const [backlogName, setBacklogName] = useState<string>("");

  const isUnderDevelopment = true; 

  if (isUnderDevelopment) {
    return <UnderDevelopment />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("tokenSecurity");
      if (token && projectId) {
        try {
          const projectData = await ProjectService.getById(token, Number(projectId));
          setProject(projectData);
        } catch (error) {
          setError(error instanceof Error ? error.message : "Erro desconhecido");
        } finally {
          setIsLoading(false);
        }
      } else {
        setError("Token de autenticação não encontrado");
      }
    };

    const fetchBacklogs = async () => {
      const token = localStorage.getItem("tokenSecurity");
      if (token && projectId) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const backlogsData: any = await BacklogService.getByProjectId(token, Number(projectId));

          if (Array.isArray(backlogsData)) {
            setBacklogs(backlogsData);
          } else if (backlogsData && Array.isArray(backlogsData.backlogs)) {
            setBacklogs(backlogsData.backlogs);
          } else {
            setError("Os dados dos backlogs não são um array válido.");
          }
        } catch (error) {
          setError(error instanceof Error ? error.message : "Erro ao carregar os backlogs");
        }
      }
    };

    fetchProject();
    fetchBacklogs();
  }, [projectId]);

  const handleCreateBacklog = async () => {
    const token = localStorage.getItem("tokenSecurity");
    if (token && projectId) {
      const backlog: IBacklogCreate = {
        name: backlogName,
        project_id: Number(projectId),
      };

      try {
        const createdBacklog = await BacklogService.create(token, backlog);
        setBacklogs((prevBacklogs) => {
          if (Array.isArray(prevBacklogs)) {
            return [...prevBacklogs, createdBacklog];
          } else {
            return [createdBacklog];
          }
        });
        alert("Backlog criado com sucesso");
        setIsCreatingBacklog(false);
        setBacklogName(""); 
      } catch (error) {
        setError(error instanceof Error ? error.message : "Erro desconhecido");
      }
    }
  };

  return (
    <Layout>
      <div className="p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <span className="flex space-x-2 text-4xl text-orange-600">
              <span className="animate-wave-1">•</span>
              <span className="animate-wave-2">•</span>
              <span className="animate-wave-3">•</span>
            </span>
          </div>
        ) : error ? (
          <p className="text-red-500">Erro: {error}</p>
        ) : project ? (
          <div>
            <h1 className="text-2xl font-semibold text-orange-700">{project.name}</h1>
            <p className="mt-2 text-gray-700">{project.description}</p>

            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => setIsCreatingBacklog(true)}
            >
              Criar Backlog
            </button>

            {isCreatingBacklog && (
              <div className="mt-4">
                <input
                  type="text"
                  value={backlogName}
                  onChange={(e) => setBacklogName(e.target.value)}
                  placeholder="Nome do backlog"
                  className="p-2 border border-gray-300 rounded"
                />
                <button
                  className="ml-4 px-4 py-2 bg-green-600 text-white rounded"
                  onClick={handleCreateBacklog}
                >
                  Criar
                </button>
                <button
                  className="ml-4 px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={() => setIsCreatingBacklog(false)}
                >
                  Cancelar
                </button>
              </div>
            )}

            <Kanban backlogs={backlogs} />
          </div>
        ) : (
          <p className="text-gray-500">Projeto não encontrado</p>
        )}
      </div>
    </Layout>
  );
};

export default DetailProject;
