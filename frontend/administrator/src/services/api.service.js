import axios from 'axios'
import { TokenService } from './token.service'

const ApiService = {
    init(baseURL){
        axios.defaults.baseURL = baseURL;
    },
    setHeader(){
        let token = localStorage.getItem('access_token');
        axios.defaults.headers.Authorization = `Bearer ${token}`;
    },

    get(endpoint, data = null){
        return axios.get(endpoint, data);
    },

    post(resource, data){
        return axios.post(resource, data, this.setHeader());
    },

    delete(resource){
        return axios.delete(resource, this.setHeader());
    },

    customRequest(data){
        return axios(data, this.setHeader());
    }
}

export default ApiService;
