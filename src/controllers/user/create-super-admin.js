const { fileLogger } = require("../../helper");
const { sendResponse,errorHandler} = require("../../middlewares");

const createSuperAdmin = ({ UserService }) => async (req, res, next) => {
  try {
    let user = await UserService.createSuperAdmin(req.body)

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
    fileLogger({error,fileName:"create-super-admin-controller"})

  }
}

module.exports = { createSuperAdmin };