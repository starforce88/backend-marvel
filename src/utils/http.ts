import axios from 'axios';

export const httpGet = async (url, query, headers) => {
    let data = await axios({
        url: url,
        method: 'GET',
        headers: headers,
        params: query
    }).then((resp) => {
        return resp.data;
    }).catch((err) => {
        console.log(err);
        return false;
    });

    return data;
}