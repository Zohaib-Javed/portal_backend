function endPoint(address, type, guarded, testData) {
    this.address = address;
    this.type = type;
    this.guarded = guarded;
    this.testData = testData;
}

module.exports = {
    signin: new endPoint("/user/sign-in", "POST", false),
    createSuperAdmin: new endPoint("/user/create-super-admin", "POST", false),
    createGrade:new endPoint("/super-admin/create-grade", "POST", true),
    createUser:new endPoint("/super-admin/create-users", "POST", true),
    createDues:new endPoint("/super-admin/create-dues", "POST", true),
    createPayment:new endPoint("/super-admin/create-payment", "POST", true),
    enrollStudent:new endPoint("/super-admin/enroll-student", "POST", true),

}
