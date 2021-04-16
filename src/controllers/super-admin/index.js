const { Router: router } = require('express');
const {superAdminDataValidations,validateData}=require('../../middlewares');
const { createGrades } = require('./create-grades');
const {createUsers} =require('./create-users');



module.exports = (services) => {
    const api = router();

    api.post('/create-grade',createGrades(services));   
    api.post('/create-users',superAdminDataValidations.createUserValidationRules,validateData,createUsers(services));   


    return api;
};

