import axios from 'axios'

const ApiService = {
    init(baseURL){
        axios.defaults.baseURL = baseURL;
    },

    setHeader(){
        let token = localStorage.getItem('access_token');
        axios.defaults.headers.access_token = `${token}`;
    },

    get(endpoint, data = null){
        return axios.get(endpoint, data);
    },

    post(resource, data){
        return axios.post(resource, data);
    },

    delete(resource){
        return axios.delete(resource);
    },

    customRequest(data){
        return axios(data);
    }
}

export default ApiService;
