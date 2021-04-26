const { apis } = require("../apis");
const { createRandomString, createRandomEmail,calculatePossibleCombinations, getRandomUserRole } = require("../helpers");

module.exports.createUserTest = async (data) => {
	let returnData=[];
	const email = createRandomEmail();
	const name = createRandomString();
  const role=data?data.role:getRandomUserRole();
	const password="123456";
	const possibleCombination = calculatePossibleCombinations({
		email,
		name,
		password,
		role,
	});
	for (let i = 0; i < possibleCombination.length; i++) {
		try {
			const { data } = await apis.createUser(possibleCombination[i]);

			// console.log('[REQUEST FULLFILLED FOR COMBINATION]', possibleCombination[i]);
			// console.log('[CREATE USER DATA]', data);
			data.password=password;
      data.role=role;
			returnData.push(data);
		} catch (e) {
			// console.log('[CREATE USER FAILED]', e.response ? e.response.data : undefined)
		}
	}
	return returnData;
}
