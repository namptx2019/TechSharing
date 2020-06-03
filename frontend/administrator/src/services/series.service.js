import ApiService from './api.service'
import { LanguageService } from './lang.service'
import {PostServiceError} from "./post.service";

const END_POINT = {
	popular: '/public-api/series/popular'
}

/**
 * Storing error when call api
 */
class SeriesServiceError extends Error
{
	constructor(code, message)
	{
		super(message);
		this.name	= this.constructor.name;
		this.message= message;
		this.code	= code;
	}
}

const SeriesService = {
	/**
	 * Get popular series by locale of application
	 *
	 * @return {Object}
	 */
	popular: async function(searchInputs = null){
		try {
			const response = await ApiService.get(
				END_POINT.popular,
				{
					params: {
						lang: LanguageService.getLang(),
						search: searchInputs,
						searchJoin: "and"
					}
				}
			);

			return response.data;
		} catch(error) {
			throw new SeriesServiceError(error.response.status, error.response.data.message);
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
			throw new SeriesServiceError(e.response.status, e.response.data.message);
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
			const response = await ApiService.get(`/public-api/series/${slug}`);
			return response.data;
		} catch(e) {
			throw new PostServiceError(e.response.status, e.response.data.message);
		}
	},
}

export default SeriesService;
export { SeriesServiceError }
