import express from 'express';
import { validateFile } from './middleware';
import { dataResponse, findCharacter } from './controller';

export const characterRoute = express.Router();

characterRoute.get('/search', validateFile, async (req, res) => {
    try{
        await dataResponse(req, res);
    }catch(err){
        res.statusCode = 500;
        res.send({
            message: err.message
        }).end();
    }
});

characterRoute.get('/search/:id', async (req, res) => {
    try{
        await findCharacter(req, res);
    }catch(err){
        res.statusCode = 500;
        res.send({
            message: err.message
        }).end();
    }
});