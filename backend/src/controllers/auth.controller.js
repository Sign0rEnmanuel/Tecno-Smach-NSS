import User from "../schemas/User.js";
import validateDataRegister from "../utils/validateDataRegister.js";
import validateDataLogin from "../utils/validateDataLogin.js";
import hashPassword from "../utils/hashPassword.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const { username, password, email } = validateDataRegister(req.body);
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            username,
            password: hashedPassword,
            email,
        });
        const token = generateToken(user);
        return res.status(201).json({
            message: "Usuario creado correctamente",
            token,
        });
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({ error: error.message });
        } else {
            console.log(error.message);
            return res
                .status(500)
                .json({ error: "Error interno del servidor" });
        }
    }
};

export const login = async (req, res) => {
    try {
        const { password, email } = validateDataLogin(req.body);
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ error: "Nombre de usuario o contraseña incorrectos" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res
                .status(400)
                .json({ error: "Nombre de usuario o contraseña incorrectos" });
        }
        const token = generateToken(user);
        return res.status(200).json({
            message: "Usuario autenticado correctamente",
            token,
        });
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({ error: error.message });
        } else {
            console.log(error.message);
            return res
                .status(500)
                .json({ error: "Error interno del servidor" });
        }
    }
};

export const profile = async (req, res) => {
    try {
        const _id = req.user._id;
        const user = await User.findById(_id);
        const userResponse = {
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        };
        return res.status(200).json(userResponse);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};
