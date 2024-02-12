import { Request, Response } from 'express';
import fs from 'fs';
import { resolve } from 'path';

const getFilters = (req: Request, res: Response) => {
    const filtersData = fs.readFileSync(
        resolve('src', 'modules', 'mock', 'config', `filters.json`),
        'utf-8',
    );
    const response = JSON.parse(filtersData);

    res.send(response);
};

export { getFilters };
