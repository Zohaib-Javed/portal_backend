const endPoints = require("./endPoints");
const api = require("./api");

module.exports.apis = {
    signin: (data) => api(endPoints.signin, data),
    createSuperAdmin: (data) => api(endPoints.createSuperAdmin, data)
}