import ApiService from './api.service'
import { LanguageService } from './lang.service'

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
	 * Get data with pagination
	 *
	 * @return { Object }
	 */
	paginate: async function(searchInputs = null){
		try {
			const response = await ApiService.get('/public-api/posts', {
				params: {
					lang: LanguageService.getLang(),
					search: searchInputs,
					searchJoin: "and"
				}
			});

			return response.data;
		} catch(e) {
			throw new PostServiceError(e.response.status, e.response.data.message);
		}
	},

	/**
	 * Get a post by slug
	 *
	 * @param {*} slug
	 *
	 * @return {Object}
	 */
	get: async function(slug){
		try {
			const response = await ApiService.get(`/public-api/posts/${slug}`);

			return response.data;
		} catch(e) {
			throw new PostServiceError(e.response.status, e.response.data.message);
		}
	},

	/**
	 * Get next page of posts
	 *
	 * @param {*} uri
	 *
	 * @return {Object}
	 */
	next: async function(uri){
		try {
			const response = await ApiService.get(uri);

			return response.data;
		} catch(e) {
			throw new PostServiceError(e.response.status, e.response.data.message);
		}
	}
}

export default PostService;
export { PostServiceError }
