const { apis } = require("./apis");
const { calculatePossibleCombinations } = require("./apis/create-multiple-combinations");
const { createRandomString, createRandomEmail } = require("./helpers");

module.exports.createSuperAdminTest = async () => {
    const email = createRandomEmail();
    const name = createRandomString();
    const possibleCombination = calculatePossibleCombinations({
        email,
        name,
        password: "89981237",
        role: "superAdmin"
    });
    let returnData;
    for (let i = 0; i < possibleCombination.length; i++) {
        try {
            const { data } = await apis.createSuperAdmin(possibleCombination[i]);
            console.log('[REQUEST FULLFILLED FOR COMBINATION]', possibleCombination[i]);
            console.log('[CRAETE SUPER ADMIN DATA]', data);
            returnData = data;
        } catch (e) {
            // console.log('[CRAETE SUPER ADMIN FAILED]', e.response ? e.response.data : undefined)
        }
    }
    returnData;
}
