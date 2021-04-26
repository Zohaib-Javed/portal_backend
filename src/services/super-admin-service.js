const { grade:Grade,user:User,duePayment:DuePayment,payment:Payment} = require('../models');
const bcrypt=require('bcrypt');

const createGrades = async (grade) => {
  const gradeRes = await Grade.create(grade);
  return gradeRes;
}

const createUsers= async (user) => {
  return await User.create(user);

}

const getStudentsList=async ()=>{
  return await User.findAll({where:{role:"student"},attributes: ['id','name', 'email','gradeId']})
}

const getTeachersList=async ()=>{
  return await User.findAll({where:{role:"teacher"},attributes: ['id','name', 'email']})
}

const enrollStudent=async ({gradeId,id})=>{
  const isUserUpdate=await User.update({gradeId},{where:{id}});
  if(isUserUpdate[0])
    return await User.findByPk(id,{attributes: ['id','name', 'email','gradeId']});
  else
    return { code: 400, message: "User Id is not found." }
}

const addDuePayment=async(dues)=>{
  const user=await User.findByPk(dues.userId);
  if(!user){
    return { code: 404, message: "User doesn't exist" }
  }
  return await DuePayment.create(dues);
}

const addPayment=async(payment)=>{
  const dues=await DuePayment.findByPk(payment.duePaymentId);
  if(!dues){
    return { code: 404, message: "Dues doesn't exist" }
  }
  else if(dues.dataValues.isPaid){
    return {code:400,message: "Dues already Paid"};
  }else if(dues.dataValues.amount+dues.dataValues.fineAfterDueDate!==payment.amount){
    return {code:400 ,message:"Payment amount is not equal to total Dues"}
  }
  const paymentRes= await Payment.create(payment);
  if(paymentRes){
    const duesUpdate= await DuePayment.update({ isPaid: true }, {
      where: {
        id:dues.dataValues.id,
      }
    });
    if(duesUpdate)return paymentRes;
  }
  return paymentRes;
}

module.exports = {
  createGrades,
  createUsers,
  addDuePayment,
  addPayment,
  getStudentsList,
  getTeachersList,
  enrollStudent,
}