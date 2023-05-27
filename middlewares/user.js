const jwt = require("jsonwebtoken");
const Joi = require('joi');
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = Joi.extend(joiPasswordExtendCore);
const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid('male', 'female'),
    password: joiPassword.string()
        .minOfSpecialCharacters(1)
        .minOfLowercase(1)
        .minOfUppercase(1)
        .minOfNumeric(1)
        .noWhiteSpaces()
        .min(8)
        .required(),
});

exports.isValide = (req, res, next) => {
    try {
        const { name, password, email, gender } = req.body;
        const result = userSchema.validate({
            name: name,
            email: email,
            password: password,
            gender: gender
        })
        if (result.error) {
            res.status(400).json({
                msg: result.error
            })
        } else {
            next();
        }
    } catch (err) {
        res.status(500).json({
            msg: "server error",
            error: err.msg
        })
    }
}