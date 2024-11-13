import { useState, useEffect } from "react";
import Button from "../../componets/Button";
import Layout from "../../componets/Layout";
import { IProjectCreate, IProject } from "../../interface/projects";
import CreateProjectModal from "../../componets/projectModel";
import { ProjectService } from "../../service/project";
import { Link } from "react-router-dom";

const Projects: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = async (projectData: IProjectCreate) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("tokenSecurity");
      if (token) {
        await ProjectService.create(token, projectData);

        fetchProjects();
        handleCloseModal();
      }
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("tokenSecurity");
      if (token) {
        const projectsData = await ProjectService.getAll(token);
        setProjects(projectsData);
      } else {
        setError("Token de autenticação não encontrado");
      }
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
      setError("Falha ao carregar projetos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Layout>
      <div className="p-6 h-full w-full flex flex-col">
        <div className="flex justify-between mt-5 mb-5">
          <h1 className="text-2xl font-semibold text-orange-700">Projetos</h1>
          <Button
            className="bg-orange-700 text-white px-4 py-2 w-1/6 rounded"
            onClick={handleOpenModal}
          >
            Criar Projeto
          </Button>
        </div>

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
        ) : !Array.isArray(projects) || projects.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-lg">Nenhum Projeto Cadastrado</p>
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Link
                to={`/projects/${project.project_id}`}
                key={project.project_id}
              >
                <div className="border p-4 rounded-lg shadow-md flex flex-col items-center relative transform transition-transform duration-200 hover:scale-105">
                  <div
                    className="w-24 h-24 rounded-full bg-orange-700 flex items-center justify-center text-white text-3xl font-bold"
                    data-tooltip-id={`tooltip-project-${project.project_id}`}
                    data-tooltip-content={project.name}
                  >
                    {project.name ? project.name.charAt(0) : "P"}
                  </div>
                  <div className="text-center mt-4">
                    <strong>{project.name}</strong>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={handleCreateProject}
      />
    </Layout>
  );
};

export default Projects;
