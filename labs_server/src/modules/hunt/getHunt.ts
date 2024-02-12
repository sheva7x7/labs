import { Request, Response } from 'express';
import fs from 'fs';
import { resolve } from 'path';

const getHunt = (req: Request, res: Response) => {
    const huntId = req.params.id;
    const huntData = fs.readFileSync(
        resolve('src', 'modules', 'mock', 'hunts', `hunt${huntId}.json`),
        'utf-8',
    );
    const response = JSON.parse(huntData);

    res.send(response);
};

export { getHunt };
