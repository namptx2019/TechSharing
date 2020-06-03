import ApiService from './api.service'
import { TokenService } from './token.service'

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
     * Login user and save access token to TokenService
     * @param data
     *
     * @return access_token
     * @throw AuthenticationError
     */
    login: async function(data){
        const requestData = {
            method: 'post',
            url: '/oauth/token',
            data: {
                grant_type: 'password',
                username: data.email,
                password: data.password,
                client_id: 2,
                client_secret: 'sEfLa8mf6uc1uQM2hq1F7AEM1M4MvjAX1T34KZEY',
                scope: '*'
            }
        }
        try {
            const response = await ApiService.customRequest(requestData);
            TokenService.saveToken(response.data.access_token);
            ApiService.setHeader();
            return response.data;
        } catch (error) {
            throw new UserServiceError(error.response.status, error.response.data.message);
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
