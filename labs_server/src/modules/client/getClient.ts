import e, { Request, Response } from 'express';
import { satisfies } from 'compare-versions';
import { resolve } from 'path';
import fs from 'fs';
import { Asset, Client } from '../types/client';

const getClient = (req: Request, res: Response) => {
    const clientId = req.params.id;
    const query = req.query;
    const clientData = fs.readFileSync(
        resolve('src', 'modules', 'mock', 'clients', `client${clientId}.json`),
        'utf-8',
    );
    const response: Client = JSON.parse(clientData);
    if (Object.keys(query).length) {
        response.assets = response.assets.filter((asset: Asset) => {
            // filter client's assets based on technology and its corresponding versions if available
            if (query.technology) {
                const queryVersion = (query.version as string) || '*';
                if (
                    !asset.technologies.some((technology) => {
                        return (
                            technology.type === query.technology &&
                            (queryVersion === '*' ||
                                satisfies(technology.version, queryVersion))
                        );
                    })
                ) {
                    return false;
                }
            }
            return true;
        });
    }
    return res.send(response);
};

export { getClient };
