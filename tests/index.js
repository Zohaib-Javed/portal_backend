require("dotenv").config();
const { createSuperAdminTest } = require("./create-super-admin.test");

const runTests = async () => {
    await createSuperAdminTest();
}

runTests();