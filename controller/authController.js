const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const token = process.env.JWT;
module.exports = class {
    static login(req, res, next) {
        res.json({ token });
    }
};