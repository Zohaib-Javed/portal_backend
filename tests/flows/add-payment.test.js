const { apis } = require("../apis");
const {calculatePossibleCombinations} = require("../helpers");

module.exports.createPaymentTest = async (due,data) => {
  let returnData;
  const possibleCombination = calculatePossibleCombinations({
    amount:data?data.amount:0,
    duePaymentId:due?due.id:0,
    date:new Date(),
  });
  console.log(possibleCombination);
  for (let i = 0; i < possibleCombination.length; i++) {
    try {
      const { data } = await apis.createPayment(possibleCombination[i]);

      // console.log('[REQUEST FULLFILLED FOR COMBINATION]', possibleCombination[i]);
      // console.log('[CREATE PAYMENT DATA]', data);
      returnData=data;
    } catch (e) {
      // console.log('[CREATE PAYMENT FAILED]', e.response ? e.response.data : undefined)
    }
  }
  return returnData;
}
