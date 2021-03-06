new Vue({
    el: '#app',
    data: {
        code: null,
        token: null,
        clientId: "c2a9fd9528954d5b9c9a44a25ff5268e", // public
        redirectURI: encodeURIComponent("https://will-cs.github.io/Spotify-Scanner/"),
        codeVerifier: null,
    },
    methods: {
        async signIn() {
            PKCE(this.clientId, this.redirectURI);
        },
    },
    created: async function () {
        const urlParams = new URLSearchParams(window.location.search);
        this.code = urlParams.get('code');
        console.log('Code', this.code);

        this.codeVerifier = window.localStorage.getItem('codeVerifier');
        console.log('Verifier', this.codeVerifier);
        console.log('Redirect', this.redirectURI);

        // Get Token from Code
        if (this.code && this.codeVerifier) {
            let tokenParams = {
                client_id: this.clientId,
                grant_type: 'authorization_code',
                code: this.code,
                redirect_uri: this.redirectURI,
                code_verifier: this.codeVerifier,
            }

            let endpoint = new URL('https://accounts.spotify.com/api/token');
            endpoint.search = new URLSearchParams(tokenParams);

            fetch(endpoint.toString(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(data => data.json()).then(console.log);
        }
    }
})