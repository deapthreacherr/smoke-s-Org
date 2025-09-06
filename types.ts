
export type ServiceType = 'Supabase' | 'GitHub' | 'Stripe' | 'Coolify';
export type ComponentType = 'Frontend' | 'Backend' | 'Database' | 'API' | 'Authentication';

export interface Service {
  type: ServiceType;
  status: 'connected' | 'disconnected' | 'error';
}

export interface Component {
  type: ComponentType;
  status: 'building' | 'online' | 'offline' | 'error';
}

export interface Project {
  id: string;
  name: string;
  components: Component[];
  services: Service[];
}

export interface AiTask {
    id: string;
    command: string;
    status: 'processing' | 'success' | 'error';
    log: string[];
}
