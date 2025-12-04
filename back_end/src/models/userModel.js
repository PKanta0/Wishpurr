const pool = require("../config/db");

exports.createUser = async (username, email, password) => {
    const [result] = await pool.query(
        "INSERT INTO users (user_name, email, password, role) VALUES (?, ?, ?, 'user')",
        [username, email, password]
    );
    return result.insertId;
};

exports.findByEmail = async (email) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
};
