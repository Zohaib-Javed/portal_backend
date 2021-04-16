var express = require('express');
var router = express.Router();

const { signIn } = require('./sign-in');
const {createSuperAdmin}=require('./create-super-admin');
module.exports = (services) => {
    router.post('/sign-in',signIn(services));  
    router.post('/create-super-admin',createSuperAdmin(services)); 

    return router;
};

