import { Request, Response } from 'express';
import { satisfies } from 'compare-versions';
import { resolve } from 'path';
import fs from 'fs';
import { Client } from '../types/client';
import { Hunt } from '../types/hunt';

const getRelatedAssets = (req: Request, res: Response) => {
    const huntId = req.params.id;
    const huntData = fs.readFileSync(
        resolve('src', 'modules', 'mock', 'hunts', `hunt${huntId}.json`),
        'utf-8',
    );
    const hunt: Hunt = JSON.parse(huntData);
    const clientId = hunt.client_id;
    const clientData = fs.readFileSync(
        resolve('src', 'modules', 'mock', 'clients', `client${clientId}.json`),
        'utf-8',
    );
    const client: Client = JSON.parse(clientData);
    const result = client.assets.filter((asset) => {
        // Conditions:
        // 1. asset is not attached to hunt
        // 2. one of asset technology type === hunt technology type
        // 3. corresponding asset versions satisfy hunt technology versions
        return (
            !asset.hunts.some((assetHunt) => assetHunt.id === hunt.id) &&
            asset.technologies.some((assetTechnology) => {
                return (
                    assetTechnology.type === hunt.technology.type &&
                    hunt.technology.versions.some((version) =>
                        satisfies(assetTechnology.version, version),
                    )
                );
            })
        );
    });

    res.send(result);
};

export { getRelatedAssets };
