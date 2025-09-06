
import React from 'react';

const BoltIcon = () => (
  <svg className="w-8 h-8 text-bolt-primary" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10.622 3.392a1.2 1.2 0 0 1 2.156 0l8.72 15.104a1.2 1.2 0 0 1-1.078 1.804H2.98a1.2 1.2 0 0 1-1.078-1.804l8.72-15.104zM12 15.6a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4zm-1.2-3.6a1.2 1.2 0 0 0 1.2-1.2V8.4a1.2 1.2 0 1 0-2.4 0v2.4a1.2 1.2 0 0 0 1.2 1.2z" transform="scale(1,-1) translate(0, -24)" />
    <path d="M11 1.5L2 15h8l-1 6.5L18 9h-7z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="flex-shrink-0 bg-bolt-dark-800/50 backdrop-blur-sm border-b border-bolt-dark-700 p-3 flex items-center z-30">
        <BoltIcon />
        <h1 className="text-xl font-bold ml-3 tracking-tight">BOLT</h1>
        <h2 className="text-xl font-medium ml-2 text-gray-400">AI Workstation</h2>
    </header>
  );
};
