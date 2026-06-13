import Order from "../schemas/Order.js";

export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ user: userId }).populate("product", "name image price");
        
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "Error al obtener los pedidos del usuario" });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("product", "name image price")
            .populate("user", "username email");
        
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ message: "Error al obtener todos los pedidos" });
    }
};

export const updateDeliveryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { deliveryStatus } = req.body;

        if (!["preparing", "shipped", "delivered"].includes(deliveryStatus)) {
            return res.status(400).json({ message: "Estado de entrega inválido" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { deliveryStatus },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        res.status(200).json({ message: "Estado de entrega actualizado exitosamente", order: updatedOrder });
    } catch (error) {
        console.error("Error updating delivery status:", error);
        res.status(500).json({ message: "Error al actualizar estado de entrega" });
    }
};
