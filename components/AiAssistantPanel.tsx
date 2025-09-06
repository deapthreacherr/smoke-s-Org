
import React, { useEffect, useRef } from 'react';
import type { AiTask } from '../types';

interface AiAssistantPanelProps {
  task: AiTask | null;
}

export const AiAssistantPanel: React.FC<AiAssistantPanelProps> = ({ task }) => {
    const logContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
        }
    }, [task?.log]);

  return (
    <aside className="w-80 bg-bolt-dark-800/30 backdrop-blur-sm border-l border-bolt-dark-700 flex flex-col p-4 animate-fade-in">
        <h2 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">AI Assistant</h2>
        <div className="flex-1 flex flex-col bg-bolt-dark-700/50 rounded-lg p-3">
            {task ? (
                <>
                <div className="flex items-center space-x-2 mb-3 pb-3 border-b border-bolt-dark-600">
                    {task.status === 'processing' && <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>}
                    {task.status === 'success' && <div className="w-3 h-3 bg-green-400 rounded-full"></div>}
                    {task.status === 'error' && <div className="w-3 h-3 bg-red-400 rounded-full"></div>}
                    <p className="text-sm font-medium capitalize">{task.status}</p>
                </div>
                <div ref={logContainerRef} className="flex-1 text-xs font-mono text-gray-400 space-y-2 overflow-y-auto">
                    {task.log.map((line, index) => (
                        <p key={index} className={`animate-fade-in ${line.startsWith('✅') ? 'text-green-300' : line.startsWith('❌') ? 'text-red-300' : ''}`}>
                            {line}
                        </p>
                    ))}
                </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-500">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l-1.414-1.414M19.778 19.778l-1.414-1.414M18.364 5.636l1.414-1.414M4.222 19.778l1.414-1.414M12 12a6 6 0 11-12 0 6 6 0 0112 0z" />
                     </svg>
                    <p className="font-medium">AI is idle</p>
                    <p className="text-xs mt-1">Issue a command to begin.</p>
                </div>
            )}
        </div>
    </aside>
  );
};
