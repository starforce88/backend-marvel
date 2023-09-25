import fs from 'fs';

export const validateFile = async (req, res, next) => {
    try{
        if(!req.query.name){
            res.statusCode = 400;
            res.send({
                message: 'Name is required in query'
            }).end();
            return;
        }
        let file = JSON.parse(fs.readFileSync(`${__dirname}/../temp/${req.query.name}.json`).toString());
        res.locals.fileContent = file;
    }catch(err){
        console.log(err);
        res.locals.fileContent = false;
    }
    next();
}