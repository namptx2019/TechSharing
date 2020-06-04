import ApiService from './api.service'


class PostServiceError extends Error
{
	constructor(code, message)
	{
		super(message);
		this.name	= this.constructor.name;
		this.message= message;
		this.code	= code;
	}
}

const PostService = {
	/**
	 * Get post list
	 *
	 * @return { Object }
	 */
	getList: async function(){
		try {
			const response = await ApiService.get('/api/post');
			return response.data;
		} catch(e) {
			throw new PostServiceError(e.response.status, e.response.data.message);
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
			const response = await ApiService.post(`/api/post/create`, data);
			return response.data;
		} catch(e) {
			throw new PostServiceError(e.response.status, e.response.data.message);
		}
	},

	/**
	 * Get a post by slug
	 *
	 * @param {*} id
	 *
	 * @return {Object}
	 */
	get: async function(id){
		try {
			const response = await ApiService.get(`/api/post/${id}`);
			return response.data;
		} catch(e) {
			throw new PostServiceError(e.response.status, e.response.data.message);
		}
	},

	/**
	 * Edit a post
	 *
	 *
	 * @return {Object}
	 */
	edit: async function(id,data){
		try {
			const response = await ApiService.post(`/api/post/edit/${id}`, data);
			return response.data;
		} catch(e) {
			throw new PostServiceError(e.response.status, e.response.data.message);
		}
	},

	/**
	 * Delete a post
	 *
	 *
	 * @return {Object}
	 */
	delete: async function(id){
		try {
			const response = await ApiService.delete(`/api/post/delete/${id}`);
			return response.data;
		} catch(e) {
			throw new PostServiceError(e.response.status, e.response.data.message);
		}
	},


}

export default PostService;
export { PostServiceError }
