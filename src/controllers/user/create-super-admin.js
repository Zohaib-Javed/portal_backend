const { sendResponse,errorHandler} = require("../../middlewares");

const createSuperAdmin = ({ UserService }) => async (req, res, next) => {
  try {
    let user = await UserService.createSuperAdmin(req.body)
    console.log("user in controller : ",user);

    if (user && !user.code) {
      user = {
        email: user.dataValues.email,
        name: user.dataValues.name, 
        token: user.token
      }
      sendResponse(res, user);
    } else {
      res.status(user.code).json({ message: user.message });
    }
  }
  catch (error) {
    errorHandler(error, req, res, next);
    // res.status().json({ message: 'Resource not found' });
  }
}

module.exports = { createSuperAdmin };