import client from "./client";

export const getMyOrders = async () => {
    const { data } = await client.get("/order/mine");
    return data;
};

export const getAllOrders = async () => {
    const { data } = await client.get("/order/all");
    return data;
};

export const updateDeliveryStatus = async (orderId, deliveryStatus) => {
    const { data } = await client.put(`/order/update-delivery/${orderId}`, {
        deliveryStatus,
    });
    return data;
};
