import React from "react";
import { IBacklog } from "../interface/backlogs";

interface KanbanProps {
  backlogs: IBacklog[];
}

const Kanban: React.FC<KanbanProps> = ({ backlogs }) => {
  if (!backlogs || backlogs.length === 0) {
    return <p className="text-center text-gray-600">Nenhum backlog encontrado.</p>;
  }

  return (
    <div className="kanban-board mt-6">
      <h2 className="text-xl font-semibold text-orange-700">Quadro Kanban</h2>
      <div className="kanban-columns mt-4 grid grid-cols-4 gap-4">
        {backlogs.map((backlog) => (
          <div
            key={backlog.backlog_id}
            className="kanban-column p-4 bg-gray-100 rounded-lg"
          >
            <h3 className="font-semibold text-gray-800">{backlog.name}</h3>
            <ul className="mt-2">
              {backlog.tasks && backlog.tasks.length > 0 ? (
                backlog.tasks.map((task) => (
                  <li key={task.id} className="text-gray-600">
                    {task.name}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">Sem tarefas atribuídas</p>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kanban;
