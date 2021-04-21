const { fileLogger } = require("../../helper");
const { sendResponse,errorHandler} = require("../../middlewares");

const addPayment = ({ SuperAdminService }) => async (req, res, next) => {
  try {
    let payment = await SuperAdminService.addPayment(req.body)
    if (payment && !payment.code) {
      payment = {
        amount: payment.dataValues.amount,
        duePaymentId: payment.dataValues.duePaymentId, 
        date:payment.dataValues.date,
      }
      sendResponse(res, payment);
    } else {
      res.status(payment.code).json({ message: payment.message });
    }
  }
  catch (error) {
    errorHandler(error, req, res, next);
    fileLogger({error,fileName:"add-payment-controller"})

  }
}

module.exports = { addPayment };