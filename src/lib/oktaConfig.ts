export const oktaConfig = {
    clientId : "0oabeo6yvjsjqgtRS5d7",
    issuer : "https://dev-47190535.okta.com/oauth2/default",
    redirectUri : "http://localhost:3000/login/callback",
    scopes: ['openid','profile','email'],
    pkce : true,
    disableHttpCheck: true,
}