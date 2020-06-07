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
     * Get slider content with status = 1
     *
     * @return { Object }
     */
    get: async function(){
        try {
            const response = await ApiService.get('/public-api/homepage-slider', {
                params: {
                    lang: LanguageService.getLang(),
                }
            });
            return response.data;
        } catch(e) {
            throw new SliderServiceError(e.response.status, e.response.data.message);

        }

    },


}

export default SliderService;
export { SliderServiceError }
