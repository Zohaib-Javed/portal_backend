const { Router: router } = require('express');
const {validateData}=require('../../middlewares');
const { check } = require('express-validator');

const { createGrades } = require('./create-grades');
const {createUsers} =require('./create-users');
const {addDuePayment}=require('./add-due-payment');
const {addPayment}=require('./add-payment');


const superAdminDataValidation=(path)=>{
  switch (path) {
		case 'create-grade':
			return [
				check("gradeNum","Grade Number is missing").exists(),
			];
		case 'create-user':
			return [
				check("email","Email is missing").exists(),
				check('email', 'Invalid email.').isEmail(),
				check('name', 'Name is missing.').exists(),
				check('password', 'Password is missing.').exists(),
				check('password','Password must atleast be 6 characters long').isLength({ min: 6 }),
				check('role','Invalid role.').isIn(['admin','teacher','student']),
			
			];
		case 'create-payment':
			return [
				check('amount', 'Amount is missing.').exists(),
				check('date','Date is missing.').exists(),
				check('duePaymentId', 'User Id is missing.').exists(),
			];
		case 'create-dues':
			return [
				check('amount', 'Amount is missing.').exists(),
				check('dueDate','Due Date is missing.').exists(),
				check('userId', 'User Id is missing.').exists(),
				check('isPaid', 'Is Paid is missing.').exists(),
			];
		default:
			break;
		}
}
module.exports = (services) => {
	const api = router();

	api.post('/create-grade',superAdminDataValidation("create-grade"),validateData,createGrades(services));   
	api.post('/create-users',superAdminDataValidation("create-user"),validateData,createUsers(services)); 
	api.post('/create-payment',superAdminDataValidation("create-payment"),validateData,addPayment(services));
	api.post('/create-dues',superAdminDataValidation("create-dues"),validateData,addDuePayment(services));  


	return api;
};

