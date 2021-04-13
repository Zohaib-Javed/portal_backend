const express = require('express');
const { jwt, errorHandler } = require('../middlewares');

const services = require('../services');

// list of controllers here
const user = require('../controllers/user');
const superAdmin =require('../controllers/super-admin');
const { superAdminGuard } = require('../middlewares');

const routersInit = () => {
    const router = express.Router();
    router.use(jwt());
    // register api points
    router.use('/user' ,user(services));
    
    router.use('/super-admin' ,superAdminGuard ,superAdmin(services));

    // catch api all errors
    // router.use(errorHandler);
    return router;
};

module.exports = routersInit;