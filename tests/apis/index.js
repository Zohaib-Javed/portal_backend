const endPoints = require("./endPoints");
const api = require("./api");

module.exports.apis = {
    signin: (data) => api(endPoints.signin, data),
    createSuperAdmin: (data) => api(endPoints.createSuperAdmin, data),
    createGrade: (data) => api(endPoints.createGrade, data),
    createUser:(data) => api(endPoints.createUser, data),
    createDues:(data) => api(endPoints.createDues, data),
    createPayment:(data) => api(endPoints.createPayment, data),
    enrollStudent: (data) => api(endPoints.enrollStudent,data),
    getStudentsList: (data) => api(endPoints.getStudentsList,data),
}