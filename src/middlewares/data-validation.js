const { validationResult } = require('express-validator');

const validateData = (req, res, next) => {
    // console.log("Validate Data",req);
    const {errors} = validationResult(req);
    console.log(errors);
    if (!errors.length==0) {
        return res.status(400).json({ error:errors[0].msg});
    } else {
        next();
    }

};

module.exports = { validateData };