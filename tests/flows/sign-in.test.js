const { apis } = require("../apis");
const {createRandomEmail,calculatePossibleCombinations } = require("../helpers");

module.exports.signInTest = async (data) => {
  const email = data?data.email:createRandomEmail();
  const password=data?data.password:"123456";
  let returnData;
  const possibleCombination = calculatePossibleCombinations({
    email,
    password,
  });

  for (let i = 0; i < possibleCombination.length; i++) {
    try {
      const { data } = await apis.signin(possibleCombination[i]);

      // console.log('[REQUEST FULLFILLED FOR COMBINATION]', possibleCombination[i]);
      // console.log('[SIGN IN DATA]', data);
      returnData=data;
    } catch (e) {
      // console.log('[SIGN IN FAILED]', e.response ? e.response.data : undefined)
    }
  }
  return returnData;
}
