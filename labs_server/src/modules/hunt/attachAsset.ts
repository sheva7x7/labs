import { Request, Response } from 'express';
import { resolve } from 'path';
import fs from 'fs';
import { Asset } from '../types/client';

const attachAsset = (req: Request, res: Response) => {
    const huntId = req.params.id;
    const newAsset = req.body.asset;
    const huntData = fs.readFileSync(
        resolve('src', 'modules', 'mock', 'hunts', `hunt${huntId}.json`),
        'utf-8',
    );
    const response = JSON.parse(huntData);
    // add new asset to hunt.assets
    response.assets.push(newAsset);
    fs.writeFileSync(
        resolve('src', 'modules', 'mock', 'hunts', `hunt${huntId}.json`),
        JSON.stringify(response, null, 4),
    );
    const clientData = fs.readFileSync(
        resolve(
            'src',
            'modules',
            'mock',
            'clients',
            `client${response.client_id}.json`,
        ),
        'utf-8',
    );
    const client = JSON.parse(clientData);
    // add hunt info to corresponding asset.hunts
    client.assets.map((asset: Asset) => {
        if (asset.id === newAsset.id) {
            const { assets, ...rest } = response;
            asset.hunts.push(rest);
        }
        return asset;
    });
    fs.writeFileSync(
        resolve(
            'src',
            'modules',
            'mock',
            'clients',
            `client${response.client_id}.json`,
        ),
        JSON.stringify(client, null, 4),
    );

    res.status(201).send(response);
};

export { attachAsset };
