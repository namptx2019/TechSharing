import ApiService from './api.service'

class RankServiceError extends Error
{
  constructor(code, message)
  {
    super(message);
    this.name	= this.constructor.name;
    this.message= message;
    this.code	= code;
  }
}

const RankService = {

  /**
   * Get all rank
   *
   * @return { Object }
   */
  get: async function(){
    try {
      const response = await ApiService.get('/api/rank/');
      return response.data;
    } catch(e) {
      throw new RankServiceError(e.response.status, e.response.data.message);
    }
  },

  /**
   * Create a rank
   *
   *
   * @return {Object}
   */
  create: async function(data){
    try {
      const response = await ApiService.post(`/api/rank/create`, data);
      return response.data;
    } catch(e) {
      throw new RankServiceError(e.response.status, e.response.data.message);
    }
  },

  /**
   * Edit a rank
   *
   *
   * @return {Object}
   */
  edit: async function(id,data){
    try {
      const response = await ApiService.post(`/api/rank/edit/${id}`, data);
      return response.data;
    } catch(e) {
      throw new RankServiceError(e.response.status, e.response.data.message);
    }
  },

  /**
   * Delete a category
   *
   *
   * @return {Object}
   */
  delete: async function(id){
    try {
      const response = await ApiService.delete(`/api/rank/delete/${id}`);
      return response.data;
    } catch(e) {
      throw new RankServiceError(e.response.status, e.response.data.message);
    }
  },


}

export default RankService;
export { RankServiceError }
