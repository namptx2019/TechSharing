import ApiService from './api.service'
import { TokenService } from './token.service'
import router from '@/router'

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
     * @param email
     * @param password
     *
     * @return access_token
     * @throw AuthenticationError
     */
    login: async function(email, password){
        const requestData = {
            method: 'post',
            url: '/oauth/token',
            data: {
                grant_type: 'password',
                username: email,
                password: password,
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
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
        } catch(e) {
            throw new UserServiceError(e.response.status, e.response.data.message);
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
            throw new UserServiceError(e.response.status, e.response.data.message);
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
     */
    update: async function(uuid, data) {

        const requestData = {
            method: 'post',
            url: `/api/user/edit/${uuid}`,
            data: data,
            headers: {'Content-Type': 'multipart/form-data' }
        }

        try {
            const response = await ApiService.customRequest(requestData);

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
