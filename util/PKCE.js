
function sha256(plain) {
    // returns promise ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
}

function base64urlencode(a) {
    // Convert the ArrayBuffer to string using Uint8 array.
    // btoa takes chars from 0-255 and base64 encodes.
    // Then convert the base64 encoded to base64url encoded.
    // (replace + with -, replace / with _, trim trailing =)
    return btoa(String.fromCharCode.apply(null, new Uint8Array(a)))
        .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

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
    setCookie('codeVerifier', codeVerifier, 1);

    // Encode string
    var hashed = await sha256(codeVerifier);
    var codeChallenge = base64urlencode(hashed);

    // Redirect to Spotify authorization API
    window.location.replace(
        "https://accounts.spotify.com/authorize?response_type=code&client_id=" + clientId +
        "&redirect_uri=" + redirectURI +
        "&scope=user-library-modify+user-library-read&code_challenge=" + codeChallenge +
        "&code_challenge_method=S256");
}
