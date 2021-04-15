const { Router: router } = require('express');
const {superAdminGuard, superAdminDataValidations,validateData}=require('../../middlewares');
const { createGrades } = require('./create-grades');
const {createUsers} =require('./create-users');
const { check } = require('express-validator');


const createUserValidationRules=[
    check('email', 'Invalid email.').isEmail().normalizeEmail(),
    check('role','Invalid role.').isIn(['admin','teacher','student'])
]
module.exports = (services) => {
    const api = router();

    api.post('/create-grade',createGrades(services));   
    api.post('/create-users',createUserValidationRules,validateData,createUsers(services));   


    return api;
};

