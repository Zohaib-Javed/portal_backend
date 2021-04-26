
const { apis } = require("../apis");
const {createRandomGrade,calculatePossibleCombinations } = require("../helpers");

module.exports.createGradeTest = async () => {
  let returnData;
  const gradeNum=createRandomGrade();
  const possibleCombination = calculatePossibleCombinations({
    gradeNum,
  });

  for (let i = 0; i < possibleCombination.length; i++) {
    try {
      const { data } = await apis.createGrade(possibleCombination[i]);

      // console.log('[REQUEST FULLFILLED FOR COMBINATION]', possibleCombination[i]);
      // console.log('[CREATE GRADE DATA]', data);
      returnData=data;
    } catch (e) {
      console.log('[CREATE GRADE FAILED]', e.response ? e.response.data : undefined)
    }
  }
  return returnData;
}
