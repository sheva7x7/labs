export interface Port {
    type: string;
    number: number;
}

export interface ClientTechnology {
    type: string;
    version: string;
}

export interface Asset {
    id: string;
    subdomain?: string;
    ip?: string;
    port: Port;
    technologies: ClientTechnology[];
    hunts: Omit<Hunt, 'assets'>[];
}

export interface Client {
    id: string;
    name: string;
    assets: Asset[];
}

export interface HuntTechnology {
    type: string;
    versions: string[];
}

export interface Hunt {
    id: string;
    vulnerability_code: string;
    description: string;
    client_id: string;
    technology: HuntTechnology;
    assets: Omit<Asset, 'hunts'>[];
}

export interface HuntListItem {
    id: string;
    vulnerability_code: string;
    description: string;
    client_id: string;
    technology: HuntTechnology;
}

export interface Filter {
    type: 'dropdown' | 'text';
    name: string;
    options?: string[];
}
