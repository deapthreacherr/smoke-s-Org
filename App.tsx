
import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ProjectView } from './components/ProjectView';
import { CommandPalette } from './components/CommandPalette';
import { AiAssistantPanel } from './components/AiAssistantPanel';
import type { Project, AiTask } from './types';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [currentTask, setCurrentTask] = useState<AiTask | null>(null);

  const handleExecuteCommand = useCallback((command: string) => {
    // Simulate AI agent processing a command
    const taskId = `task-${Date.now()}`;
    setCurrentTask({ id: taskId, command, status: 'processing', log: [`> ${command}`] });

    const updateLog = (newLog: string) => {
      setCurrentTask(prev => prev ? { ...prev, log: [...prev.log, newLog] } : null);
    };

    setTimeout(() => updateLog("Task received by AI agent..."), 500);

    if (command.toLowerCase().startsWith('create new agent')) {
      const name = command.split('create new agent')[1]?.trim() || `Agent ${projects.length + 1}`;
      setTimeout(() => {
        const newProject: Project = {
          id: `proj-${Date.now()}`,
          name,
          components: [],
          services: [],
        };
        setProjects(prev => [...prev, newProject]);
        setSelectedProjectId(newProject.id);
        updateLog(`✅ Agent '${name}' created successfully.`);
        setCurrentTask(prev => prev ? { ...prev, status: 'success' } : null);
      }, 1500);
    } else if (command.toLowerCase().startsWith('add service') && selectedProjectId) {
        const serviceName = command.split('add service')[1]?.trim().toLowerCase();
        let serviceType: Project['services'][0]['type'] | null = null;
        if (serviceName?.includes('supabase')) serviceType = 'Supabase';
        if (serviceName?.includes('github')) serviceType = 'GitHub';
        if (serviceName?.includes('stripe')) serviceType = 'Stripe';
        if (serviceName?.includes('coolify')) serviceType = 'Coolify';

        if(serviceType) {
            setTimeout(() => {
                updateLog(`Integrating ${serviceType}...`);
                setProjects(prev => prev.map(p => {
                    if (p.id === selectedProjectId && !p.services.some(s => s.type === serviceType)) {
                        return { ...p, services: [...p.services, { type: serviceType, status: 'connected' }] };
                    }
                    return p;
                }));
                 setTimeout(() => {
                    updateLog(`✅ ${serviceType} integrated successfully.`);
                    setCurrentTask(prev => prev ? { ...prev, status: 'success' } : null);
                }, 1000);
            }, 1000);
        } else {
             setTimeout(() => {
                updateLog(`❌ Unknown service: ${serviceName}`);
                setCurrentTask(prev => prev ? { ...prev, status: 'error' } : null);
            }, 1000);
        }
    } else if (command.toLowerCase().startsWith('add component') && selectedProjectId) {
        const componentType = command.split('add component')[1]?.trim().toLowerCase() as Project['components'][0]['type'] || 'API';
        setTimeout(() => {
            updateLog(`Building ${componentType} component...`);
             setProjects(prev => prev.map(p => {
                if (p.id === selectedProjectId) {
                    return { ...p, components: [...p.components, { type: componentType, status: 'building' }] };
                }
                return p;
            }));
             setTimeout(() => {
                 setProjects(prev => prev.map(p => p.id === selectedProjectId ? { ...p, components: p.components.map(c => c.type === componentType ? {...c, status: 'online'} : c) } : p));
                 updateLog(`✅ ${componentType} component deployed.`);
                 setCurrentTask(prev => prev ? { ...prev, status: 'success' } : null);
             }, 1500);
        }, 1000);

    } else {
        setTimeout(() => {
            updateLog(selectedProjectId ? '❌ Unrecognized command for active agent.' : '❌ No active agent. Use "create new agent <name>".');
            setCurrentTask(prev => prev ? { ...prev, status: 'error' } : null);
        }, 1000);
    }
  }, [projects, selectedProjectId]);
  
  const selectedProject = projects.find(p => p.id === selectedProjectId) || null;

  return (
    <div className="bg-bolt-dark text-gray-200 font-sans h-screen w-screen overflow-hidden flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
            projects={projects} 
            selectedProjectId={selectedProjectId} 
            onSelectProject={setSelectedProjectId}
            onNewAgent={() => handleExecuteCommand('create new agent')}
        />
        <main className="flex-1 flex flex-col relative">
          <div 
            className="absolute inset-0 bg-grid-pattern opacity-10" 
            style={{ 
              backgroundImage: 'radial-gradient(#2A2655 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          ></div>
          <ProjectView project={selectedProject} />
          <CommandPalette onExecute={handleExecuteCommand} />
        </main>
        <AiAssistantPanel task={currentTask} />
      </div>
    </div>
  );
};

export default App;
