import { Request, Response } from 'express';
import fs from 'fs';
import { resolve } from 'path';

const getHuntList = (req: Request, res: Response) => {
    const clientId = req.params.clientId;
    const clientData = fs.readFileSync(
        resolve('src', 'modules', 'mock', 'hunts', `list${clientId}.json`),
        'utf-8',
    );
    const response = JSON.parse(clientData);

    res.send(response);
};

export { getHuntList };
