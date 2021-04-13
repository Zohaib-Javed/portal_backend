const { sendResponse,errorHandler} = require("../../middlewares");

const createUsers = ({ SuperAdminService }) => async (req, res, next) => {
  try {
    let user = await SuperAdminService.createUsers(req.body)
    console.log("Create Users controller : ",user);

    if (user && !user.code) {
      user = {
        email: user.dataValues.email,
        name: user.dataValues.name, 
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

module.exports = { createUsers };