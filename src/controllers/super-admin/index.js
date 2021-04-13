const { Router: router } = require('express');
const {superAdminGuard}=require('../../middlewares');
// const guard = require('express-jwt-permissions')();
// const { validateData } = require('../../middlewares');

const { createGrades } = require('./create-grades');

module.exports = (services) => {
    const api = router();

    api.post('/create-grade',createGrades(services));   

    return api;
};

