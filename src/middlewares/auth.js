import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token Invalid" });
    }
};
