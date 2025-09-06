
import React from 'react';
import type { Service } from '../types';

const ICONS: Record<Service['type'], React.ReactNode> = {
  Supabase: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 102 58.9" fill="currentColor"><path d="M83.3 58.9 102 48.3V10.6L83.3 0v58.9zM64.6 48.3 83.3 58.9V0L64.6 10.6v37.7zM45.9 37.7 64.6 48.3V10.6L45.9 21.2v16.5zM27.3 27.1 45.9 37.7V21.2L27.3 10.6v16.5zM18.7 0v10.6L0 21.2v16.5L18.7 48.3V59l-18.7-10.7V21.2L18.7 0z"/></svg>,
  GitHub: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
  Stripe: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20.62 2.658A1.914 1.914 0 0018.963.89L.076 11.23a1.914 1.914 0 000 3.368L4.25 17.11a1.914 1.914 0 011.657 1.767l.518 4.234A1.914 1.914 0 008.082 25L23.923 14.59a1.914 1.914 0 000-3.368L19.75 8.71a1.914 1.914 0 01-1.657-1.767l-.518-4.285z"/></svg>,
  Coolify: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm1.13,15.82a1.86,1.86,0,0,1-2.26,0L6,13.53l1.13-1.13,3.75,3.75,5.87-5.87L18,11.41Z"/></svg>,
};

const URLs: Record<Service['type'], string> = {
    Supabase: 'https://supabase.com',
    GitHub: 'https://github.com',
    Stripe: 'https://stripe.com',
    Coolify: 'https://coolify.io',
};


export const ServiceCard: React.FC<{ service: Service }> = ({ service }) => {
  const isConnected = service.status === 'connected';

  return (
    <a href={URLs[service.type]} target="_blank" rel="noopener noreferrer" className="block p-3 bg-bolt-dark-700/50 rounded-lg border border-bolt-dark-600 hover:border-bolt-primary transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-gray-300">{ICONS[service.type]}</div>
          <span className="font-medium text-gray-200">{service.type}</span>
        </div>
        <div className="flex items-center space-x-2">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                isConnected ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
            }`}>
            {service.status}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
        </div>
      </div>
    </a>
  );
};
