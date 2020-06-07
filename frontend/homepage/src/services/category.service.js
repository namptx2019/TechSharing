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
            const response = await ApiService.get('/public-api/categories/');

            return response.data;
        } catch(e) {
            throw new CategoryServiceError(e.response.status, e.response.data.message);
        }
    },

    /**
     * Get a category by slug
     *
     * @param {*} slug
     *
     * @return {Object}
     */
    getSpecific: async function(slug){
        try {
            const response = await ApiService.get(`/public-api/categories/get/${slug}`);

            return response.data;
        } catch(e) {
            throw new CategoryServiceError(e.response.status, e.response.data.message);
        }
    },


     /**
     * Get popular categories
     *
     * @return { Object }
     */
    getPopular: async function(){
        try {
            const response = await ApiService.get('/public-api/categories/popular');

            return response.data;
        } catch(e) {
            throw new CategoryServiceError(e.response.status, e.response.data.message);
        }
    },

}

export default CategoryService;
export { CategoryServiceError }
