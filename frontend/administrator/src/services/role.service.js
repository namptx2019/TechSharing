import ApiService from './api.service'


class RoleServiceError extends Error
{
  constructor(code, message)
  {
    super(message);
    this.name	= this.constructor.name;
    this.message= message;
    this.code	= code;
  }
}

const RoleService = {
  /**
   * Get post list
   *
   * @return { Object }
   */
  getList: async function(){
    try {
      const response = await ApiService.get('/api/role');
      return response.data;
    } catch(e) {
      throw new RoleServiceError(e.response.status, e.response.data.message);
    }
  },
}

export default RoleService;
export { RoleServiceError }
