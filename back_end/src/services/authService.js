const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

exports.register = async (username, email, password) => {
    const exist = await userModel.findByEmail(email);
    if (exist) throw new Error("Email already exists");

    const hash = await bcrypt.hash(password, 10);
    const userId = await userModel.createUser(username, email, hash);
    return userId;
};

exports.login = async (email, password) => {
    const user = await userModel.findByEmail(email);
    if (!user) throw new Error("User not found");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error("Invalid credentials");

    const token = jwt.sign(
        { id: user.user_id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
    );

    return {
        token,
        user: {
            id: user.user_id,
            name: user.user_name,
            email: user.email,
            role: user.role,
        },
    };
};
