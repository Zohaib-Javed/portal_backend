const { check } = require('express-validator');


const dataValidation=(req,res,next)=>{
  switch (req.url.replace("/","")) {
    case 'create-users':
      return [
        check('email', 'Invalid email.').isEmail().normalizeEmail(),
        check('role','Invalid role.').isIn(['admin','teacher','student']),

      ];

    default:
      break;
  }
}


module.exports= dataValidation;