const { grade:Grade,user:User} = require('../models');


const createGrades = async (grade) => {
  const gradeRes = await Grade.create(grade);
  return gradeRes;
}

const createUsers= async (user) => {
  return await User.create(user);
}

module.exports = {
  createGrades,
  createUsers,
}