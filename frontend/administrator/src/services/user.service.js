import ApiService from './api.service'
import axios from "axios";

class UserServiceError extends Error
{
    constructor(code, message)
    {
        super(message);
        this.name	= this.constructor.name;
        this.message= message;
        this.code	= code;
    }
}

const UserService = {

    /**
     * User login
     *
     * @return { Object }
     */
    login: async function(data){
        try {
            const response = await ApiService.post('/api/user/auth', data);
            return response.data;
        } catch(e) {
            throw new UserServiceError(e.response.status, e.response.data.message);
        }
    },

    /**
     * User register
     *
     * @return { Object }
     */
    register: async function(data){
        try {
            const requestData = {
                method: 'post',
                url: '/api/user/register',
                data: {
                    username: data.username,
                    password: data.password,
                }
            }
            const response = await ApiService.customRequest(requestData);
            return response.data;
        } catch(e) {
            throw new UserServiceError(e.response.status, e.response.data.message);
        }
    },

    /**
     * Current user info
     *
     * @return { Object }
     */
    me: async function(){
        ApiService.setHeader();
        try {
            const response = await ApiService.get(`/api/user/me`);
            return response;
        } catch(e) {
            throw new UserServiceError(e.response.status, e.response.data.message);
        }
    },

}

export default UserService;
export { UserServiceError }
