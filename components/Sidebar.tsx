
import React from 'react';
import type { Project } from '../types';

interface SidebarProps {
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (id: string) => void;
  onNewAgent: () => void;
}

const AgentIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);


export const Sidebar: React.FC<SidebarProps> = ({ projects, selectedProjectId, onSelectProject, onNewAgent }) => {
  return (
    <aside className="w-64 bg-bolt-dark-800/30 backdrop-blur-sm border-r border-bolt-dark-700 flex flex-col p-4 animate-fade-in">
      <h2 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">Agents</h2>
      <div className="flex-1 space-y-2 overflow-y-auto">
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            className={`w-full text-left p-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${
              selectedProjectId === project.id
                ? 'bg-bolt-primary text-white shadow-lg'
                : 'hover:bg-bolt-dark-700 text-gray-300'
            }`}
          >
            <AgentIcon />
            <span className="font-medium">{project.name}</span>
          </button>
        ))}
      </div>
      <button
        onClick={onNewAgent}
        className="mt-4 w-full p-3 rounded-lg bg-bolt-dark-600 hover:bg-bolt-primary text-gray-200 font-semibold transition-all duration-200 flex items-center justify-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        <span>New Agent</span>
      </button>
    </aside>
  );
};
