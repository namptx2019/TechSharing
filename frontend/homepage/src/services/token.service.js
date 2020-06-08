const TOKEN_KEY = 'access_token'

const TokenService = {
	getToken() {
		const href = window.location.href;
		if(href.indexOf(TOKEN_KEY) > -1) {
			if (window.location.hash && window.location.hash == '#_=_') {
				window.location.hash = '';
			}
			let token = href.slice(href.indexOf(TOKEN_KEY)+TOKEN_KEY.length+1);
			this.saveToken(token);
			window.location.href = process.env.API_URL;
			return token;
		}

		return localStorage.getItem(TOKEN_KEY);
    },

    saveToken(accessToken) {
        localStorage.setItem(TOKEN_KEY, accessToken);
    },

    removeToken(){
        localStorage.removeItem(TOKEN_KEY);
    }
}

export { TokenService };
