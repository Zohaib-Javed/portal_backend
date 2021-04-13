const expressJwt = require('express-jwt');
const {pathToRegexp} = require('path-to-regexp')


const unprotected = [
    
    pathToRegexp('/api/v1/user/sign-in'),
    pathToRegexp('/api/v1/user/create-super-admin'),
];

const jwt = () => {

    return expressJwt({ secret: process.env.SECRET_KEY ,algorithms: ['sha1', 'RS256', 'HS256']}).unless({
        path: unprotected
    });
}
module.exports = { jwt };
