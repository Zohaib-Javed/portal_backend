
const { apis } = require("../apis");
const {calculatePossibleCombinations,getRandomDate } = require("../helpers");

module.exports.createDuesTest = async (user,data) => {
  let returnData=[];
  const dueDate=getRandomDate();

  const possibleCombination = calculatePossibleCombinations({
    amount:1000,
    userId:user?user.id:0,
    description:data?data.desc:null,
    dueDate,
    isPaid:false,
    fineAfterDueDate:data?data.fine:null,
  });

  for (let i = 0; i < possibleCombination.length; i++) {
    try {
      const { data } = await apis.createDues(possibleCombination[i]);

      // console.log('[REQUEST FULLFILLED FOR COMBINATION]', possibleCombination[i]);
      // console.log('[CREATE DUES DATA]', data);
      returnData.push(data);
    } catch (e) {
      // console.log('[CREATE DUES FAILED]', e.response ? e.response.data : undefined)
    }
  }
  return returnData;
}
