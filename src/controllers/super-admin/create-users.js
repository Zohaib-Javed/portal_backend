const { fileLogger } = require("../../helper");
const { sendResponse,errorHandler} = require("../../middlewares");

const createUsers = ({ SuperAdminService }) => async (req, res, next) => {
  try {
    let user = await SuperAdminService.createUsers(req.body)
    if (user && !user.code) {
      user = {
        email: user.dataValues.email,
        name: user.dataValues.name,
        id:user.dataValues.id, 
      }
      sendResponse(res, user);
    } else {
      res.status(user.code).json({ message: user.message });
    }
  }
  catch (error) {
    errorHandler(error, req, res, next);
    fileLogger({error,fileName:"create-users-controller"})

  }
}

module.exports = { createUsers };