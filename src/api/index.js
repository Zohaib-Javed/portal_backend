const express = require('express');
const { jwt, errorHandler } = require('../middlewares');

const services = require('../services');

const user = require('../controllers/user');
const superAdmin =require('../controllers/super-admin');
const { superAdminGuard } = require('../middlewares');

const routersInit = () => {
    const router = express.Router();
    router.use('/user' ,user(services));
    router.use('/super-admin' ,superAdminGuard ,superAdmin(services));
    router.use(errorHandler);
    
    return router;
};

module.exports = routersInit;