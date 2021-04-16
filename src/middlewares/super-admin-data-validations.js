const { check } = require('express-validator');

const createUserValidationRules=[
  check('email', 'Invalid email.').isEmail().normalizeEmail(),
  check('role','Invalid role.').isIn(['admin','teacher','student'])
]


module.exports= {
  createUserValidationRules,
};