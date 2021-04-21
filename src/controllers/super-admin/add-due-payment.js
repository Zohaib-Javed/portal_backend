const { fileLogger } = require("../../helper");
const { sendResponse,errorHandler} = require("../../middlewares");

const addDuePayment = ({ SuperAdminService }) => async (req, res, next) => {
  try {
    let dues = await SuperAdminService.addDuePayment(req.body)
    if (dues && !dues.code) {
      dues = {
        amount: dues.dataValues.amount,
        userId: dues.dataValues.userId, 
        dueDate:dues.dataValues.dueDate,
        isPaid:dues.dataValues.isPaid,
      }
      sendResponse(res, dues);
    } else {
      res.status(dues.code).json({ message: dues.message });
    }
  }
  catch (error) {
    errorHandler(error, req, res, next);
    fileLogger({error,fileName:"add-due-payment-controller"})

  }
}

module.exports = { addDuePayment };