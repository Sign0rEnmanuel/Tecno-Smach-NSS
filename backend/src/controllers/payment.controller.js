import { Preference, Payment } from "mercadopago";
import client from "../mercadopago.js";
import Product from "../schemas/Product.js";
import Order from "../schemas/Order.js";

const trimUrl = (url) => (url || "").replace(/\/+$/, "");

export const createPreference = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ message: "Stock insuficiente" });
        }

        const order = await Order.create({
            user: req.user._id,
            product: product._id,
            quantity: Number(quantity),
            totalPrice: Number(product.price) * Number(quantity),
            paymentStatus: "pending",
        });

        const frontendUrl = trimUrl(process.env.FRONTEND_URL);
        const backendUrl = trimUrl(process.env.BACKEND_URL || process.env.NGROK_URL);

        const preference = new Preference(client);

        const response = await preference.create({
            body: {
                items: [
                    {
                        id: product._id.toString(),
                        title: product.name,
                        quantity: Number(quantity),
                        unit_price: Number(product.price),
                        currency_id: "BRL",
                        picture_url: product.image,
                    },
                ],
                back_urls: {
                    success: `${frontendUrl}/pago-exitoso`,
                    failure: `${frontendUrl}/pago-fallido`,
                    pending: `${frontendUrl}/pago-pendiente`,
                },
                auto_return: "approved",
                metadata: {
                    order_id: order._id.toString(),
                    product_id: product._id.toString(),
                    quantity: Number(quantity),
                },
                notification_url: `${backendUrl}/api/payment/webhook`,
            },
        });

        order.mpPreferenceId = response.id;
        await order.save();

        res.status(200).json({ init_point: response.init_point });
    } catch (error) {
        console.error("Error creating preference:", error);
        res.status(500).json({ message: "Error al crear la preferencia de pago" });
    }
};

export const webhook = async (req, res) => {
    try {
        const { type } = req.query;
        let dataId = req.query["data.id"];

        if (!dataId && req.body && req.body.data) {
            dataId = req.body.data.id;
        }

        if (type === "payment" || req.body.action === "payment.created") {
            const payment = new Payment(client);
            const paymentInfo = await payment.get({ id: dataId });

            if (paymentInfo.status === "approved") {
                const metadata = paymentInfo.metadata;

                if (metadata && metadata.order_id) {
                    const orderId = metadata.order_id;
                    const productId = metadata.product_id;
                    const quantity = metadata.quantity || 1;

                    // Actualizar estado del pedido a aprobado
                    const updatedOrder = await Order.findByIdAndUpdate(orderId, {
                        paymentStatus: "approved",
                        deliveryStatus: "preparing"
                    });

                    // Descontar stock
                    if (updatedOrder) {
                        await Product.findByIdAndUpdate(productId, {
                            $inc: { stock: -quantity }
                        });
                        console.log(`✅ Pago aprobado. Pedido ${orderId} actualizado. Stock descontado para producto: ${productId}`);
                    }
                }
            }
        }

        res.status(200).send("OK");
    } catch (error) {
        console.error("Error en el webhook:", error);
        res.status(500).send("Internal Server Error");
    }
};
