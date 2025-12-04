const service = require("../services/authService");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const id = await service.register(username, email, password);
        res.json({ message: "registered", userId: id });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await service.login(email, password);
        res.json(data);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};
