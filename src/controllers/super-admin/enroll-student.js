const { fileLogger } = require("../../helper");
const { sendResponse,errorHandler} = require("../../middlewares");

const enrollStudent = ({ SuperAdminService }) => async (req, res, next) => {
  try {
    let user = await SuperAdminService.enrollStudent(req.body)
    console.log(user)
    if (user && !user.code) {
      sendResponse(res, user);
    } else {
      res.status(user.code).json({ message: user.message });
    }
  }
  catch (error) {
    errorHandler(error, req, res, next);
    fileLogger({error,fileName:"enroll-student-controller"})

  }
}

module.exports = { enrollStudent };