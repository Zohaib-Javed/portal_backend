var express = require('express');
var router = express.Router();
// const guard = require('express-jwt-permissions')();
// const { validateData } = require('../../middlewares');
var joi=require('joi');

const { signIn } = require('./sign-in');
const {createSuperAdmin}=require('./create-super-admin');
module.exports = (services) => {
    // const api = router();

    //SignIn
    router.post('/sign-in',signIn(services));  
    router.post('/create-super-admin',createSuperAdmin(services)); 

    return router;
};

