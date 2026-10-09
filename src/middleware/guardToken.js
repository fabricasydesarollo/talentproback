import { loadSecrets } from "../config/secrets.js";
import jwt from "jsonwebtoken";

export const guardToken = async (req, res, next) => {
    try {
        const secretCache = await loadSecrets();
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        console.log('Token received:', token, 'Secret:', secretCache.JWT_SECRET);
        if (!token) return res.status(401).json({ message: "No token provided" });
        const payload = jwt.verify(token, secretCache.JWT_SECRET);

        console.log('Token payload:', payload);
        
        req.user = payload;
        return next();

    } catch (error) {
        console.error("Error validating token:", error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
}