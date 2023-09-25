import express from 'express';
import fs from 'fs';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { characterRoute } from './character/route';
dotenv.config({path: `${__dirname}/.env`});

const dataCors = cors({origin: true});
const app = express();
const PORT = process.env.PORT ? process.env.PORT : 3001;

app.use(dataCors);

app.get('/', async(req, res) => {
    console.log(process.env);
    res.send({message: 'Hello World'}).end();
});

app.use('/character', characterRoute);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});