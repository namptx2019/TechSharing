import ApiService from './api.service'
import { TokenService } from './token.service'

class AuthenticationError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

class UserServiceError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
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
                client_secret: 'CYcXfaYHM84OM2x41inQeNHVK0dPOhT3IO5ovuFw',
                scope: '*'
            }
        }

        try {
            const response = await ApiService.customRequest(requestData);
            TokenService.saveToken(response.data.access_token);
            ApiService.setHeader();
            return response.data.access_token;
        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message);
        }
    },

    /**
     * Logout the current user by remove access_token in localstorage
     */
    logout: function(){
        TokenService.removeToken();
        ApiService.removeHeader();
    },

    /**
     * Get current user
     */
    getUserInfo: async function() {
        try {
            const response = await ApiService.get('/public-api/user/me');

            return response.data;
        } catch(error) {
            throw new UserServiceError(error.response.status, error.response.data.message);
        }
    },


    /**
     * Register User
     *
     * @param {FormData} formData
     */
    register: async function(formData) {
        const requestData = {
            method: 'post',
            url: '/public-api/register',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
        }

        try {
            const response = await ApiService.customRequest(requestData);

            return response.data
        } catch(error) {
            throw new UserServiceError(error.response.status, error.response.data.message);
        }
    },

    /**
     * Get user by uuid
     *
     * @param {String} uuid
     */
    getUserByUuid: async function(uuid) {
        try {
            const response = await ApiService.get(`/public-api/user/${uuid}`);

            return response.data;
        } catch(e) {
            throw new UserServiceError(e.response.status, e.response.data.message);
        }
    },

    /**
     * Update user by uuid
     *
     *
     * @return {Object}
     */
    update: async function(uuid,data){
        try {
            const response = await ApiService.post(`/api/user/edit/${uuid}`, data);
            return response.data;
        } catch(e) {
            throw new UserServiceError(e.response.status, e.response.data.message);
        }
    },


    /**
     * Get top 5 highest score
     */
    leaderboard: async function() {
        try {
            const response = await ApiService.get('/public-api/leaderboard');

            return response.data;
        } catch(error) {
            throw new UserServiceError(error.response.status, error.response.data.message);
        }
    },
}



export default UserService;
export { AuthenticationError, UserServiceError }
