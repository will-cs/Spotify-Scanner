import generateCodeChallenge from './util/generateCodeChallenge.js'
import makeId from './util/makeId.js'

const codeVerifier = makeId(128);
generateCodeChallenge(codeVerifier).then(codeChallenge => {
    window.location.replace(
        "https://accounts.spotify.com/authorize?response_type=code&client_id=c2a9fd9528954d5b9c9a44a25ff5268e&redirect_uri=https%3a%2f%2fwill-cs.github.io%2fSpotify-Scanner%2f&scope=user-library-modify+user-library-read&code_challenge=" +
        codeChallenge + "&code_challenge_method=S256");
});