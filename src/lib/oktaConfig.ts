export const oktaConfig = {
    clientId : "0oabfnd4e45N8nTmx5d7",
    issuer : "https://dev-26702103.okta.com/oauth2/default",
    redirectUri : "http://localhost:3000/login/callback",
    scopes: ['openid','profile','email'],
    pkce : true,
    disableHttpCheck: true,
}