const { Router: router } = require('express');
const {validateData, jwt}=require('../../middlewares');
const { check } = require('express-validator');

const { createGrades } = require('./create-grades');
const {createUsers} =require('./create-users');
const {addDuePayment}=require('./add-due-payment');
const {addPayment}=require('./add-payment');
const { getStudentsList } = require('./get-students-list');
const { getTeachersList } = require('./get-teachers-list');
const { enrollStudent } = require('./enroll-student');


const superAdminDataValidation=(path)=>{
  switch (path) {
		case 'create-grade':
			return [
				check("gradeNum","Grade Number is missing").exists(),
				check('gradeNum',"Grade Number must be between 1 to 10").isInt({ min: 1, max: 10 })
			];
		case 'create-user':
			return [
				check("email","Email is missing").exists(),
				check('email', 'Invalid email.').isEmail(),
				check('name', 'Name is missing.').exists(),
				check('password', 'Password is missing.').exists(),
				check('password','Password must atleast be 6 characters long').isLength({ min: 6 }),
				check('role','Role is Missing.').exists(),
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
		case 'enroll-student':
			return [
				check("gradeId","Grade ID is missing").exists(),
				check('id', 'User Id is missing.').exists(),

			];
		default:
			break;
		}
}
module.exports = (services) => {
	const api = router();

	api.post('/create-grade',jwt(),superAdminDataValidation("create-grade"),validateData,createGrades(services));   
	api.post('/create-users',jwt(),superAdminDataValidation("create-user"),validateData,createUsers(services)); 
	api.post('/create-payment',jwt(),superAdminDataValidation("create-payment"),validateData,addPayment(services));
	api.post('/create-dues',jwt(),superAdminDataValidation("create-dues"),validateData,addDuePayment(services));  
	api.get('/get-students-list',jwt(),getStudentsList(services));
	api.get('/get-teachers-list',jwt(),getTeachersList(services));
	api.post('/enroll-student',jwt(),superAdminDataValidation("enroll-student"),validateData,enrollStudent(services));  

	return api;
};

