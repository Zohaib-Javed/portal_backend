const { user:User} = require('../models');
var jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');


const signIn = async ({ email, password }) => {
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return { code: 404, message: "User doesnt exist" }
  } else if (! await user.validPassword(user.password,password)) {
    return { code: 401, message: "Incorrect password" }
  }
  else {
    console.log(user.dataValues);
    const token = jwt.sign(user.dataValues,process.env.SECRET_KEY);
    return {
      ...user,
      token
    };
  }
}

const createSuperAdmin = async (user) => {
  return await User.create(user);
}


module.exports = {
  createSuperAdmin,
  signIn,
}