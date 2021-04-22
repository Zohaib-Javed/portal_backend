const { fileLogger } = require("../../helper");
const { sendResponse,errorHandler} = require("../../middlewares");

const getStudentsList = ({ SuperAdminService }) => async (req, res, next) => {
  try {
    let stdList = await SuperAdminService.getStudentsList(req.body)
    if (stdList && !stdList.code) {
      sendResponse(res, stdList);
    } else {
      res.status(stdList.code).json({ message: stdList.message });
    }
  }
  catch (error) {
    errorHandler(error, req, res, next);
    fileLogger({error,fileName:"get-students-list-controller"});

  }
}

module.exports = { getStudentsList };