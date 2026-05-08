const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { createAccessToken, createRefreshToken } = require("./auth.services");
const { getUserByEmail, createUser } = require("../auth/auth.model");

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const user = await getUserByEmail(email);
        //checkinf the user is present or not
        if (!user) {
            return res.status(401).json({ message: "Email not found" });
        }

        const verifyPassword = await bcrypt.compare(password, user.password);
        //if password is not correct
        if (!verifyPassword) {
            return res
                .status(401)
                .json({ message: "Invalid credentials" });
        }
        //generating the token
        const accessToken = createAccessToken(user.id);
        const refreshToken = createRefreshToken(user.id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // true in production with HTTPS
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({ message: "Login successful", accessToken,user: { id: user.id, name: user.name, email: user.email,role: user.role,is_verified: user.is_verified } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const userRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !name || !password) {
            res.status(403).json({ message: "enter all the required feilds" });
        }

        const user = await getUserByEmail(email);

        if (user) {
            return res.status(403).json({ message: "User Already Exits" });
        }

        const hash = await bcrypt.hash(password, 5);

        const result = await createUser(name, email, hash);
        if (!result) {
            throw new Error({ message: "something went wrong" });
        }
        res.status(200).json({ message: "User registered successfully" });
    } catch (err) {
        console.log(err);

        res.status(500).json({ error: "Internal Server Error", err });
    }
};
const userRefresh = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            message: "Refresh token not found",
        });
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET,

        (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: "Invalid refresh token",
                });
            }

            // create new access token
            const accessToken = createAccessToken(decoded.userId);

            return res.status(200).json({
                accessToken,
            });
        },
    );
};

const userLogout = async (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true, 
    });
    res.json({success: true, message: "Logged out successfully" });
};

module.exports = { userLogin, userRegister, userRefresh, userLogout };
