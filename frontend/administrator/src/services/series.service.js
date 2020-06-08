import ApiService from './api.service'

/**
 * Storing error when call api
 */
class SeriesServiceError extends Error
{
	constructor(code, message)
	{
		super(message);
		this.name	= this.constructor.name;
		this.message= message;
		this.code	= code;
	}
}

const SeriesService = {

  /**
   * Get series list
   *
   * @return { Object }
   */
  getList: async function(){
    try {
      const response = await ApiService.get('/api/series');
      return response.data;
    } catch(e) {
      throw new SeriesServiceError(e.response.status, e.response.data.message);
    }
  },

  /**
   * Create a series
   *
   *
   * @return {Object}
   */
  create: async function(data){
    try {
      const response = await ApiService.post(`/api/series/create`, data);
      return response.data;
    } catch(e) {
      throw new SeriesServiceError(e.response.status, e.response.data.message);
    }
  },

  /**
   * Get a series by id
   *
   * @param {*} id
   *
   * @return {Object}
   */
  get: async function(id){
    try {
      const response = await ApiService.get(`/api/series/${id}`);
      return response.data;
    } catch(e) {
      throw new SeriesServiceError(e.response.status, e.response.data.message);
    }
  },

  /**
   * Edit a series
   *
   *
   * @return {Object}
   */
  edit: async function(id,data){
    try {
      const response = await ApiService.post(`/api/series/edit/${id}`, data);
      return response.data;
    } catch(e) {
      throw new SeriesServiceError(e.response.status, e.response.data.message);
    }
  },

  /**
   * Delete a series
   *
   *
   * @return {Object}
   */
  delete: async function(id){
    try {
      const response = await ApiService.delete(`/api/series/delete/${id}`);
      return response.data;
    } catch(e) {
      throw new SeriesServiceError(e.response.status, e.response.data.message);
    }
  },

  /**
   * Remove a post from series
   *
   *
   * @return {Object}
   */
  removePost: async function(data){
    try {
      const response = await ApiService.post(`/api/series/remove-post/`,data);
      return response.data;
    } catch(e) {
      throw new SeriesServiceError(e.response.status, e.response.data.message);
    }
  },

  /**
   * Add a post from series
   *
   *
   * @return {Object}
   */
  addPost: async function(data){
    try {
      const response = await ApiService.post(`/api/series/add-post/`,data);
      return response.data;
    } catch(e) {
      throw new SeriesServiceError(e.response.status, e.response.data.message);
    }
  },

  /**
   * Retrieve post list from series
   *
   *
   * @return {Object}
   */
  getListPost: async function(id){
    try {
      const response = await ApiService.get(`/api/series/${id}/posts`);
      return response.data;
    } catch(e) {
      throw new SeriesServiceError(e.response.status, e.response.data.message);
    }
  },
}

export default SeriesService;
export { SeriesServiceError }
