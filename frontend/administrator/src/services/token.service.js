const TOKEN_KEY = 'access_token';

const TokenService = {
  /**
   * Get token from local storage
   *
   * @return {string}
   */
  getToken: function() {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Save access token to local storage
   * @param {string} accessToken
   *
   * @return {void}
   */
  saveToken: function(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  /**
   * Unset Token from local storage
   */
  removeToken: function() {
    localStorage.removeItem(TOKEN_KEY);
  },

}

export { TokenService }
