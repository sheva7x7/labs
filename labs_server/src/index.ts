// src/index.js
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ClientRouter } from './modules/client/router';
import { HuntRouter } from './modules/hunt/router';
import { ConfigRouter } from './modules/config/router';

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.use('/client', ClientRouter);
app.use('/hunt', HuntRouter);
app.use('/config', ConfigRouter);

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
