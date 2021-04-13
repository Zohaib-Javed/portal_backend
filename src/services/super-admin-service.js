const { grade:Grade} = require('../models');


const createGrades = async (grade) => {
  const gradeRes = await Grade.create(grade);
  console.log(gradeRes);
  return gradeRes;
}


module.exports = {
  createGrades,
}