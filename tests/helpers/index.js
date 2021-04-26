const { calculatePossibleCombinations } = require("./create-multiple-combinations");
const roles=['admin','teacher','student']
const createRandomString = () => Math.random().toString(36).substr(7);
const createRandomEmail = () => Math.random().toString(36).substr(7) + "@gmail.com";
const createRandomGrade = () =>Math.floor(Math.random() * 10) + 1 
const getRandomUserRole=()=> roles[Math.floor(Math.random() * roles.length)];
const getRandomDate=()=> {
  const start=new Date();
  const end=new Date(2022,1);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

module.exports={
  calculatePossibleCombinations,
  createRandomEmail,
  createRandomString,
  createRandomGrade,
  getRandomUserRole,
  getRandomDate,
}