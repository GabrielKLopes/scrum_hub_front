import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../componets/Layout";
import { ProjectService } from "../../service/project";
import { UserService } from "../../service/users.service";
import { SquadService } from "../../service/squad.service";

export const Home: React.FC = () => {
  const [usersCount, setUsersCount] = useState<number>(0);
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const [squadsCount, setSquadsCount] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      const token = localStorage.getItem("tokenSecurity");

      if (!token) {
        setError("Token de autenticação não encontrado");
        return;
      }

      try {
        const usersResponse = await UserService.getAll(token);
        const projectsResponse = await ProjectService.getAll(token);
        const squadsResponse = await SquadService.getAllSquads(token);

        setUsersCount(usersResponse.length);
        setProjectsCount(projectsResponse.length);
        setSquadsCount(squadsResponse.length);
      } catch (error) {
        console.error("Erro ao carregar as contagens", error);
        setError("Erro ao carregar as contagens");
      }
    };

    fetchCounts();
  }, []);

  return (
    <Layout>
      <div className="p-6">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-orange-800">Usuários</h2>
              <p className="text-4xl font-bold text-orange-600">{usersCount}</p>
              <Link to="/users" className="text-orange-600 hover:underline mt-4 block">
                Ver todos os usuários
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-orange-800">Projetos</h2>
              <p className="text-4xl font-bold text-orange-600">{projectsCount}</p>
              <Link to="/projects" className="text-orange-600 hover:underline mt-4 block">
                Ver todos os projetos
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold text-orange-800">Squads</h2>
              <p className="text-4xl font-bold text-orange-600">{squadsCount}</p>
              <Link to="/squads" className="text-orange-600 hover:underline mt-4 block">
                Ver todas as squads
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
