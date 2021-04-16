const { validationResult } = require('express-validator');

const validateData = (req, res, next) => {
    const {errors} = validationResult(req);
    if (!errors.length==0) {
        return res.status(400).json({ error:errors[0].msg});
    } else {
        next();
    }

};

module.exports = { validateData };