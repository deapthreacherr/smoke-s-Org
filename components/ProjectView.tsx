
import React, { Suspense } from 'react';
import type { Project } from '../types';
import { ServiceCard } from './ServiceCard';

// Lazy load the 3D scene component for better performance
const Scene3D = React.lazy(() => import('./Scene3D.tsx'));

interface ProjectViewProps {
  project: Project | null;
}

const WelcomeScreen: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in">
        <div className="w-24 h-24 mb-6 rounded-full bg-bolt-dark-700 flex items-center justify-center animate-pulse-glow">
             <svg className="w-12 h-12 text-bolt-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                 <path d="M11 1.5L2 15h8l-1 6.5L18 9h-7z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome to BOLT</h2>
        <p className="mt-2 text-lg text-gray-400 max-w-md">
            Your AI-powered workstation. Create or select an agent from the sidebar to begin.
        </p>
        <p className="mt-6 text-sm text-gray-500 font-mono">
           Try: "create new agent MyWebApp"
        </p>
    </div>
);


export const ProjectView: React.FC<ProjectViewProps> = ({ project }) => {
  if (!project) {
    return <WelcomeScreen />;
  }

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto animate-slide-in-bottom">
      <h1 className="text-3xl font-bold tracking-tight mb-2">{project.name}</h1>
      <p className="text-gray-400 mb-6">Visualizing agent architecture and integrations.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <div className="lg:col-span-2 rounded-xl bg-bolt-dark-800/50 p-4 border border-bolt-dark-700 min-h-[300px] lg:min-h-0">
          <h3 className="font-semibold mb-2 text-gray-300">3D Architecture View</h3>
          <Suspense fallback={<div className="flex items-center justify-center h-full text-gray-400">Loading 3D Scene...</div>}>
            <Scene3D project={project} />
          </Suspense>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="rounded-xl bg-bolt-dark-800/50 p-4 border border-bolt-dark-700">
            <h3 className="font-semibold mb-4 text-gray-300">Connected Services</h3>
            <div className="space-y-3">
              {project.services.length > 0 ? (
                project.services.map(service => <ServiceCard key={service.type} service={service} />)
              ) : (
                <p className="text-sm text-gray-500 font-mono">No services connected. Try: "add service supabase"</p>
              )}
            </div>
          </div>
          <div className="rounded-xl bg-bolt-dark-800/50 p-4 border border-bolt-dark-700">
             <h3 className="font-semibold mb-4 text-gray-300">Components</h3>
             <div className="space-y-3">
                {project.components.length > 0 ? (
                     project.components.map(comp => (
                        <div key={comp.type} className="flex items-center justify-between text-sm">
                            <span className="text-gray-300">{comp.type}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                comp.status === 'online' ? 'bg-green-500/20 text-green-300' :
                                comp.status === 'building' ? 'bg-yellow-500/20 text-yellow-300 animate-pulse' :
                                'bg-red-500/20 text-red-300'
                            }`}>{comp.status}</span>
                        </div>
                     ))
                ) : (
                    <p className="text-sm text-gray-500 font-mono">No components built. Try: "add component Frontend"</p>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
