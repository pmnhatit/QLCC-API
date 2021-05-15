const joi = require('@hapi/joi');

exports.validation = {
    username: joi.string().alphanum().min(1).max(30),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
}