const { grade:Grade,user:User} = require('../models');


const createGrades = async (grade) => {
  const gradeRes = await Grade.create(grade);
  console.log(gradeRes);
  return gradeRes;
}

const createUsers= async (user) => {
  console.log("Create Users services : ",user);
  return await User.create(user);
}

module.exports = {
  createGrades,
  createUsers,
}