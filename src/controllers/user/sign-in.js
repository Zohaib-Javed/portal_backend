const { fileLogger } = require("../../helper");
const { sendResponse,errorHandler} = require("../../middlewares");

const signIn = ({ UserService }) => async (req, res, next) => {
    try {
        let user = await UserService.signIn(req.body)

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
        fileLogger({error,fileName:"sign-in-controller"})
    }
}

module.exports = { signIn };