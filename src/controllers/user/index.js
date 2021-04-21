var express = require('express');
var router = express.Router();
const { check } = require('express-validator');
const {validateData}=require('../../middlewares');
const { signIn } = require('./sign-in');
const {createSuperAdmin}=require('./create-super-admin');

const superAdminDataValidation=(path)=>{
  switch (path) {
		case 'sign-in':
			return [
				check("email","Email is missing").exists(),
				check('email', 'Invalid email.').isEmail(),
				check('password', 'Password is missing.').exists(),
				check('password','Password must atleast be 6 characters long').isLength({ min: 6 }),
			];
		case 'create-super-admin':
			return [
				check("email","Email is missing").exists(),
				check('email', 'Invalid email.').isEmail(),
				check('name', 'Name is missing.').exists(),
				check('password', 'Password is missing.').exists(),
				check('password','Password must atleast be 6 characters long').isLength({ min: 6 }),
				check('role','Role is missing.').exists(),
				check('role','Invalid role.').isIn(['superAdmin']),
			
			];
		default:
			break;
		}
}
module.exports = (services) => {
    router.post('/sign-in',superAdminDataValidation("sign-in"),validateData,signIn(services));  
    router.post('/create-super-admin',superAdminDataValidation("create-super-admin"),validateData,createSuperAdmin(services)); 

    return router;
};

