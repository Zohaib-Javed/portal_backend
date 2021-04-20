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
			check('email',"Email is missing").exists(),
		  check('email', 'Invalid email.').isEmail().normalizeEmail(),
		  check('role','Invalid role.').isIn(['admin','teacher','student']),
		 
		];
	case 'create-user':
	  return [
		check('email', 'Invalid email.').isEmail().normalizeEmail(),
		check('role','Invalid role.').isIn(['admin','teacher','student']),
	   
	  ];
	case 'create-payment':
	return [
	check('email', 'Invalid email.').isEmail().normalizeEmail(),
	check('role','Invalid role.').isIn(['admin','teacher','student']),
	
	];
	case 'create-dues':
	return [
		check('email', 'Invalid email.').isEmail().normalizeEmail(),
		check('role','Invalid role.').isIn(['admin','teacher','student']),
		
	];
	default:
	  break;
  }
}
module.exports = (services) => {
	const api = router();

	api.post('/create-grade',createGrades(services));   
	api.post('/create-users',superAdminDataValidation("create-user"),validateData,createUsers(services)); 
	api.post('/create-payment',addPayment(services));
	api.post('/create-dues',addDuePayment(services));  


	return api;
};

