import { Hunt } from './hunt';

export interface Port {
    type: string;
    number: number;
}

export interface Technology {
    type: string;
    version: string;
}

export interface Asset {
    id: string;
    subdomain?: string;
    ip?: string;
    port: Port;
    technologies: Technology[];
    hunts: Omit<Hunt, 'assets'>[];
}

export interface Client {
    id: string;
    name: string;
    assets: Asset[];
}
