const API = require('./api.js')

const isLogged = async () => {
    const token = localStorage.getItem('access_token');

    if (!token) return false;
    res = await API.verifyToken(token);
    if (!res[0]) return false;
    return true;
};

module.exports = {
    isLogged
}