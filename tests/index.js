require("dotenv").config();
const {enrollStudentTest, createSuperAdminTest,signInTest, createGradeTest, createUserTest, createDuesTest,createPaymentTest } = require("./flows");
const sessionStorage =require('sessionstorage');
const runTests = async () => {
	const createSuperAdminResponse=await createSuperAdminTest();
	console.log("[CreateSuperAdminResponse] : ",createSuperAdminResponse);
	const signInResponse=await signInTest(createSuperAdminResponse[0]);
	console.log("[SignInResponse] : ",signInResponse)
	if(signInResponse)
		sessionStorage.setItem("auth_token",signInResponse.token)
	const createGradeResponse=await createGradeTest();
	console.log("[CreateGradeResponse] : ",createGradeResponse);
	const createUserResponse=await createUserTest({role:"student"});
	console.log("[CreateUserResponse] : ",createUserResponse);
	const createUserFailedResponse=await createUserTest({role:"random"});
	console.log("[CreateUserFailedResponse] : ",createUserFailedResponse);
	const enrollStudentResponse=await enrollStudentTest({gradeId:createGradeResponse.id,userId:createUserResponse[0].id})
	console.log("[EnrollStudentResponse] : ",enrollStudentResponse);
	const createDuesResponse=await createDuesTest(createUserResponse[0],{desc:"first installement",fine:500});
	console.log("[CreateDuesResponse] : ",createDuesResponse);
	const  createPaymentResponse=await createPaymentTest(createDuesResponse[2],{amount:1500});
	console.log("[CreatePaymentResponse] : ",createPaymentResponse);
	const  createPaymentResponseFailure=await createPaymentTest(createDuesResponse[3],{amount:1000});
	console.log("[CreatePaymentResponseFailure] : ",createPaymentResponseFailure);
}

runTests();