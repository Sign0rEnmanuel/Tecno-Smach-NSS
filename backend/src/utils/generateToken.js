import jwt from "jsonwebtoken";

const generateToken = (user) => {
    const payload = {
        _id: user._id,
        username: user.username,
    };
    const options = {
        expiresIn: "7d",
        algorithm: "HS256",
    };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

export default generateToken;
