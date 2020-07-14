const { check } = require('express-validator');

exports.userRegisterValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Required!'),
    check('email')
        .isEmail()
        .withMessage('Write valid mail'),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Password must contain at least 5 characters')
];