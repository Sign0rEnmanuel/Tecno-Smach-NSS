import jwt from "jsonwebtoken";
import User from "../schemas/User.js";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res
            .status(401)
            .json({ message: "No se ha proporcionado un token" });
    }
    try {
        const tokenString = token.startsWith("Bearer ")
            ? token.slice(7)
            : token;
        const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }
        
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token no válido" });
    }
};

export default authMiddleware;
