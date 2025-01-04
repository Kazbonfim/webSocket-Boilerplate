const token = '12345'

module.exports = class {
    static login(req, res, next) {
        res.json({ token });
    }

    static websocket(req, res, next) {
        res.json({ token });
    }
};