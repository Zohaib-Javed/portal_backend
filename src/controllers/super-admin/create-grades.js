const { sendResponse,errorHandler} = require("../../middlewares");

const createGrades = ({ SuperAdminService }) => async (req, res, next) => {
  try {
    let grades = await SuperAdminService.createGrades(req.body)
    if (grades && !grades.code) {
      sendResponse(res, grades);
    } else {
      res.status(grades.code).json({ message: grades.message });
    }
  }
  catch (error) {
    errorHandler(error, req, res, next);
  }
}

module.exports = { createGrades };