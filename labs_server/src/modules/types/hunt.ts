import { Asset } from './client';

export interface Technology {
    type: string;
    versions: string[];
}

export interface Hunt {
    id: string;
    vulnerability_code: string;
    description: string;
    client_id: string;
    technology: Technology;
    assets: Omit<Asset, 'hunts'>[];
}
