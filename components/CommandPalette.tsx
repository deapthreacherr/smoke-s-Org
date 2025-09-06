
import React, { useState } from 'react';

interface CommandPaletteProps {
  onExecute: (command: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onExecute }) => {
  const [command, setCommand] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      onExecute(command);
      setCommand('');
    }
  };

  return (
    <div className="flex-shrink-0 bg-bolt-dark-800/50 backdrop-blur-sm border-t border-bolt-dark-700 p-3 z-20">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-bolt-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Command AI agent... (e.g., create new agent MyApp)"
          className="w-full bg-transparent focus:outline-none text-gray-200 placeholder-gray-500 font-mono"
        />
        <button type="submit" className="text-xs font-semibold text-gray-400 border border-bolt-dark-600 px-2 py-1 rounded-md hover:bg-bolt-dark-600">
          EXECUTE
        </button>
      </form>
    </div>
  );
};
