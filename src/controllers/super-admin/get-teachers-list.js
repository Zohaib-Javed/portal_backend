const { fileLogger } = require("../../helper");
const { sendResponse,errorHandler} = require("../../middlewares");

const getTeachersList = ({ SuperAdminService }) => async (req, res, next) => {
  try {
    let teacherList = await SuperAdminService.getTeachersList(req.body)
    if (teacherList && !teacherList.code) {
      sendResponse(res, teacherList);
    } else {
      res.status(teacherList.code).json({ message: teacherList.message });
    }
  }
  catch (error) {
    errorHandler(error, req, res, next);
    fileLogger({error,fileName:"get-teachers-list-controller"});

  }
}

module.exports = { getTeachersList };