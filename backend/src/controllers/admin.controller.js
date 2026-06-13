import User from "../schemas/User.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password");
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
};

export const changeUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id } = req.user;
        const { role } = req.body;

        if (!["admin", "user"].includes(role)) {
            return res.status(400).json({ message: "Rol inválido" });
        }

        if (id === _id) {
            return res
                .status(403)
                .json({ message: "No puedes cambiar tu propio rol" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        user.role = role;
        await user.save();

        res.status(200).json({
            message: "Rol actualizado exitosamente",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el rol" });
    }
};
