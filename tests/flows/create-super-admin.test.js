const { apis } = require("../apis");
const { createRandomString, createRandomEmail,calculatePossibleCombinations } = require("../helpers");

module.exports.createSuperAdminTest = async () => {
	let returnData=[];
	const email = createRandomEmail();
	const name = createRandomString();
	const password="123456";
	const possibleCombination = calculatePossibleCombinations({
		email,
		name,
		password,
		role: "superAdmin"
	});

	for (let i = 0; i < possibleCombination.length; i++) {
		try {
			const { data } = await apis.createSuperAdmin(possibleCombination[i]);

			// console.log('[REQUEST FULLFILLED FOR COMBINATION]', possibleCombination[i]);
			// console.log('[CREATE SUPER ADMIN DATA]', data);
			data.password=password;
			returnData.push(data);
		} catch (e) {
			// console.log('[CREATE SUPER ADMIN FAILED]', e.response ? e.response.data : undefined)
		}
	}
	return returnData;
}
