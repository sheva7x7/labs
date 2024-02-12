import { Request, Response } from 'express';
import fs from 'fs';
import { resolve } from 'path';

const getClientList = (req: Request, res: Response) => {
    const listData = fs.readFileSync(
        resolve('src', 'modules', 'mock', 'clients', `list.json`),
        'utf-8',
    );
    const response = JSON.parse(listData);

    res.send(response);
};

export { getClientList };
