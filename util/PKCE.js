
// Generates code challenge for Spotify PKCE authorization
async function PKCE(clientId, redirectURI) {
    // Generate 128 character string
    var codeVerifier = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 128; i++) {
        codeVerifier += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    // Store code verifier for token generation
    window.localStorage.setItem('codeVerifier', codeVerifier);

    // Encode string
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const hashed = window.crypto.subtle.digest('SHA-256', data);
    const codeChallenge = btoa(String.fromCharCode.apply(null, new Uint8Array(hashed))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''));

    // Redirect to Spotify authorization API
    window.location.replace(
        "https://accounts.spotify.com/authorize?response_type=code&client_id=" + clientId +
        "&redirect_uri=" + redirectURI +
        "&scope=user-library-modify+user-library-read&code_challenge=" + codeChallenge +
        "&code_challenge_method=S256");
}
