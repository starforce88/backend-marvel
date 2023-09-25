import { httpGet } from '../utils/http';
import md5 from 'md5';
import fs from 'fs';

export const dataResponse = async (req, res) => {
    let list = [];
    if(res.locals.fileContent){
        list = res.locals.fileContent
    }else{
        let ts = Math.floor(Date.now() / 1000);
        let find = await httpGet(`${process.env.MARVEL_API_URL}/v1/public/characters`, {
            apikey: process.env.MARVEL_PUBLIC_KEY,
            ts: ts,
            nameStartsWith: req.query.name,
            hash: md5(ts+process.env.MARVEL_PRIVATE_KEY+process.env.MARVEL_PUBLIC_KEY)
        }, {});

        if(find.data.results){
            let characters = find.data.results;
            for(let i = 0; i<characters.length; i++){
                let character = {
                    id: characters[i]['id'],
                    name: characters[i]['name']
                }

                list.push(character);
            }
        }

        fs.writeFileSync(`${__dirname}/../temp/${req.query.name}.json`, JSON.stringify(list));
    }
    res.send({characters: list}).end();
}

export const findCharacter = async (req, res) => {
    let data = {};
    let ts = Math.floor(Date.now() / 1000);
    let find = await httpGet(`${process.env.MARVEL_API_URL}/v1/public/characters/${req.params.id}`, {
        apikey: process.env.MARVEL_PUBLIC_KEY,
        ts: ts,
        hash: md5(ts+process.env.MARVEL_PRIVATE_KEY+process.env.MARVEL_PUBLIC_KEY)
    }, {});
    data = find.data.results[0]
    res.send({info: data}).end();
}