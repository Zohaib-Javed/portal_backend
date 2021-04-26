
const { apis } = require("../apis");
const {calculatePossibleCombinations } = require("../helpers");

module.exports.enrollStudentTest = async ({gradeId,userId}) => {
  let returnData;
  const possibleCombination = calculatePossibleCombinations({
    gradeId,
    id:userId,
  });

  for (let i = 0; i < possibleCombination.length; i++) {
    try {
      const { data } = await apis.enrollStudent(possibleCombination[i]);

      // console.log('[REQUEST FULLFILLED FOR COMBINATION]', possibleCombination[i]);
      // console.log('[ENROLL STUDENT DATA]', data);
      returnData=data;
    } catch (e) {
      console.log('[ENROLL STUDENT FAILED]', e.response ? e.response.data : undefined)
    }
  }
  return returnData;
}
