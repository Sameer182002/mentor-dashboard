import Cookies from 'js-cookie'

// TODO: secure cookies + iron session of next

const securityObject = {
    secure: true, // indicating if the cookie transmission requires a secure protocol (https).
    sameSite: 'strict', //to control whether the browser is sending a cookie along with cross-site requests
    // path: '', // indicating the path where the cookie is visible.
    // domain :'' , // indicating a valid domain where the cookie should be visible. The cookie will also be visible to all subdomains.
    expires: 2
}
const api = Cookies.withAttributes(securityObject)

export const cookie = {
    set taAuthToken(token) {
        api.set("x-auth-token-mentor", token);
    },
    get taAuthToken() {
        return api.get("x-auth-token-mentor");
    },
    removeTaAuthToken() {
        Cookies.remove("x-auth-token-mentor");
    }
};