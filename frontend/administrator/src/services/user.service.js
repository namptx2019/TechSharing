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
        client_secret: 'CYcXfaYHM84OM2x41inQeNHVK0dPOhT3IO5ovuFw',
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
   * Get users list
   *
   * @return { Object }
   */
  getList: async function(){
    try {
      const response = await ApiService.get('/api/user');
      return response.data;
    } catch(e) {
      throw new UserServiceError(e.response.status, e.response.data.message);
    }
  },

  /**
   * Create a user
   *
   *
   * @return {Object}
   */
  create: async function(data){
    try {
      const response = await ApiService.post(`/api/user/create`, data);
      return response.data;
    } catch(e) {
      throw new UserServiceError(e.response.status, e.response.data.message);
    }
  },

  /**
   * Get a user by uuid
   *
   * @param {*} uuid
   *
   * @return {Object}
   */
  get: async function(uuid){
    try {
      const response = await ApiService.get(`/api/user/${uuid}`);
      return response.data;
    } catch(e) {
      throw new UserServiceError(e.response.status, e.response.data.message);
    }
  },

  /**
   * Edit a user by uuid
   *
   *
   * @return {Object}
   */
  edit: async function(uuid,data){
    try {
      const response = await ApiService.post(`/api/user/edit/${uuid}`, data);
      return response.data;
    } catch(e) {
      throw new UserServiceError(e.response.status, e.response.data.message);
    }
  },

  /**
   * Delete a post
   *
   *
   * @return {Object}
   */
  delete: async function(uuid){
    try {
      const response = await ApiService.delete(`/api/user/delete/${uuid}`);
      return response.data;
    } catch(e) {
      throw new UserServiceError(e.response.status, e.response.data.message);
    }
  },

}

export default UserService;
export { UserServiceError }
