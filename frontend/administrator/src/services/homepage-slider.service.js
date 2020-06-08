import ApiService from './api.service'

class SliderServiceError extends Error
{
    constructor(code, message)
    {
        super(message);
        this.name	= this.constructor.name;
        this.message= message;
        this.code	= code;
    }
}

const SliderService = {
  /**
   * Get all sliders
   *
   * @return { Object }
   */
  get: async function(){
    try {
      const response = await ApiService.get('/api/slider/all');
      return response.data;
    } catch(e) {
      throw new SliderServiceError(e.response.status, e.response.data.message);
    }
  },

  /**
   * Create a slider
   *
   *
   * @return {Object}
   */
  create: async function(data){
    try {
      const response = await ApiService.post(`/api/slider/create`, data);
      return response.data;
    } catch(e) {
      throw new SliderServiceError(e.response.status, e.response.data.message);
    }
  },

  /**
   * Edit a slider
   *
   *
   * @return {Object}
   */
  edit: async function(id,data){
    try {
      const response = await ApiService.post(`/api/slider/update/${id}`, data);
      return response.data;
    } catch(e) {
      throw new SliderServiceError(e.response.status, e.response.data.message);
    }
  },

  /**
   * Delete a slider
   *
   *
   * @return {Object}
   */
  delete: async function(id){
    try {
      const response = await ApiService.delete(`/api/slider/delete/${id}`);
      return response.data;
    } catch(e) {
      throw new SliderServiceError(e.response.status, e.response.data.message);
    }
  },


}

export default SliderService;
export { SliderServiceError }
