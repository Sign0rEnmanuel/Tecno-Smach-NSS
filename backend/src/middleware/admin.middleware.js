import jwt from "jsonwebtoken";

const adminMiddleware = (req, res, next) => {
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
        if (decoded.role !== "admin") {
            return res.status(401).json({ message: "No tiene permisos" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token no válido" });
    }
};

export default adminMiddleware;
