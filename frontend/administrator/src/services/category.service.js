import ApiService from './api.service'

class CategoryServiceError extends Error
{
    constructor(code, message)
    {
        super(message);
        this.name	= this.constructor.name;
        this.message= message;
        this.code	= code;
    }
}

const CategoryService = {

    /**
     * Get all categories
     *
     * @return { Object }
     */
    get: async function(){
        try {
            const response = await ApiService.get('/api/category/');
            return response.data;
        } catch(e) {
            throw new CategoryServiceError(e.response.status, e.response.data.message);
        }
    },

    /**
     * Get a category by slug
     *
     * @param {*} id
     *
     * @return {Object}
     */
    getSpecific: async function(id){
        try {
            const response = await ApiService.get(`/api/category/${id}`);

            return response.data;
        } catch(e) {
            throw new CategoryServiceError(e.response.status, e.response.data.message);
        }
    },

    /**
     * Create a category
     *
     *
     * @return {Object}
     */
    create: async function(data){
        try {
            const response = await ApiService.post(`/api/category/create`, data);
            return response.data;
        } catch(e) {
            throw new CategoryServiceError(e.response.status, e.response.data.message);
        }
    },


}

export default CategoryService;
export { CategoryServiceError }
