import ApiService from './api.service'

class CommentServiceError extends Error
{
    constructor(code, message)
    {
        super(message);
        this.name	= this.constructor.name;
        this.message= message;
        this.code	= code;
    }
}

const CommentService = {
    postComment: async function(slug,data){
        try {
            const response = await ApiService.post(`/api/post/${slug}/comment`, data);
            return response.data;
        } catch(e) {
            throw new CommentServiceError(e.response.status, e.response.data.message);
        }
    },

    getComment:async function(slug){
        try {
            const response = await ApiService.get(`/public-api/posts/${slug}/comment`);
            return response.data;
        } catch(e) {
            throw new CommentServiceError(e.response.status, e.response.data.message);
        }
    },
}

export default CommentService;
export { CommentServiceError }
