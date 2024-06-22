const Users = require('../models/User');
const { getToken } = require("../utils/helpers");

const signup = async (req, res) => {
    const { username, email } = req.body;
    try {
        const existinguser = await Users.findOne({ email:email });
        if (existinguser) {
            return res.status(404).json({ message: "User already exists." });
        }

        const newUser = await Users.create({ username, email });
        const token = await getToken(newUser);

        // setting http only cookie, not to be sent to client
        return res.status(200).cookie('token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 }).json(newUser);
    } catch (error) {
        res.status(500).json("Something went wrong....");
    }
}

const login = async (req, res) => {
 
    const {email} = req.body;

    const user = await Users.findOne({email: email});
    if (!user) {
        return res.status(403).json({err: "Invalid credentials"});
    }

    const token = await getToken(user);

    // setting http only cookie, not to be sent to client
    return res.status(200).cookie('token', token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 }).json(user);
}

const logout = async (req, res) => {

    return res.status(200).clearCookie('token', { httpOnly: true }).send("Logged out successfully.");
}

module.exports = { login, signup, logout };