import axios from 'axios';

export default class HttpService {
    constructor(){
        this.url = 'https://localhost:7278/api/Search';
    }

    async getData(top,skip){
        var records = await axios.get(`${this.url}/${top}/${skip}`);
        return records;
    }
}