function endPoint(address, type, guarded, testData) {
    this.address = address;
    this.type = type;
    this.guarded = guarded;
    this.testData = testData;
}

module.exports = {
    signin: new endPoint("/user/sign-in", "POST", false),
    createSuperAdmin: new endPoint("/user/create-super-admin", "POST", false)
}
