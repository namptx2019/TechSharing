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
            const response = await ApiService.get('/public-api/categories/', {
                params: {
                    lang: LanguageService.getLang(),
                }
            });

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
            const response = await ApiService.get(`/public-api/categories/get/${slug}`, {
                params: {
                    lang: LanguageService.getLang(),
                }
            });

            return response.data;
        } catch(e) {
            throw new CategoryServiceError(e.response.status, e.response.data.message);
        }
    },

    /**
     * Get all hierarchy categories
     *
     * @return { Object }
     */
    getHierarchy: async function(searchInputs = null){
        try {
            const response = await ApiService.get('/public-api/categories/hierarchy', {
                params: {
                    lang: LanguageService.getLang(),
                    search: searchInputs,
                    searchJoin: "and"
                }
            });

            return response.data;
        } catch(e) {
            throw new CategoryServiceError(e.response.status, e.response.data.message);
        }
    },

     /**
     * Get hierarchy only header categories
     *
     * @return { Object }
     */
    getHeaderHierarchy: async function(){
        try {
            const response = await ApiService.get('/public-api/categories/header', {
                params: {
                    lang: LanguageService.getLang(),
                }
            });

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
            const response = await ApiService.get('/public-api/categories/popular', {
                params: {
                    lang: LanguageService.getLang(),
                }
            });

            return response.data;
        } catch(e) {
            throw new CategoryServiceError(e.response.status, e.response.data.message);
        }
    },

}

export default CategoryService;
export { CategoryServiceError }
