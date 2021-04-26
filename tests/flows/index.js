const { createSuperAdminTest } = require("./create-super-admin.test");
const {signInTest}=require('./sign-in.test');
const {createGradeTest}=require('./create-grades.test');
const {createUserTest}=require('./create-users.test');
const {createDuesTest}=require('./add-due-payment.test');
const {createPaymentTest}=require('./add-payment.test');
const { enrollStudentTest } = require("./enroll-student.test");
module.exports = {
  createSuperAdminTest,
  signInTest,
  createGradeTest,
  createUserTest,
  createDuesTest,
  createPaymentTest,
  enrollStudentTest,
}