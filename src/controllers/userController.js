import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { validateUser } from "../utils/validateUser.js";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
    try {
        const { valid, message } = validateUser(req.body);

        if (!valid) {
            return res.status(400).json({ message });
        }

        const uniqEmail = await User.findOne({ email: req.body.email });
        const saltRounds = 10;

        if (uniqEmail) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const user = { ...req.body, password: hashedPassword };
        const newUser = new User(user);
        await newUser.save();
        const { password, ...safeUser } = newUser.toObject();

        return res.status(201).json({ user: safeUser, message: "User created successfully" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Error creating user" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_TOKEN, { expiresIn: process.env.JWT_EXPIRES });
        res.cookie("token", token, {
            httpOnly: true, // http
            secure: process.env.NODE_ENV === "production", // https
            sameSite: "strict", // cegas serangan csrf
            maxAge: Number(process.env.COOKIE_MAX_AGE),
        });
        res.status(200).json({ message: "Login Success" });
    } catch (error) {
        console.error("Login error: ", error.message);
        return res.status(500).json({ message: "Terjadi kesalahan terhadap server, silahkan coba lagi nanti!" });
    }
};

export const logoutUser = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout success" });
};
