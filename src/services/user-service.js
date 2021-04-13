const { user:User} = require('../models');
console.log("Model import in user-service: ",User)
var config=require('dotenv').config();
var jwt=require('jsonwebtoken');

/**
 * 
 * @param {Object} param0 email
 * @returns jwt token against signed in user
 */
const signIn = async ({ email, password }) => {
  const user = await User.findOne({ where: { email: email } });
  // console.log(user);
  if (!user) {
    return { code: 404, message: "user doesnt exist" }
  } else if (! await user.validPassword(user.password,password)) {
    return { code: 401, message: "Incorrect password" }
  }
  else {
    console.log(user.dataValues);
    const token = jwt.sign(user.dataValues,process.env.SECRET_KEY);
    console.log("Token : ",token)
    return {
      ...user,
      token
    };
  }
}

const createSuperAdmin = async (user) => {
  console.log("user in service : ",user);
  return await User.create(user);
}


module.exports = {
  createSuperAdmin,
  signIn,
}