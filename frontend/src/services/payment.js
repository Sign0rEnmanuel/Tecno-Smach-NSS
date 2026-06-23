import client from "./client";

export const createPaymentPreference = async (productId, quantity = 1, address) => {
    const { data } = await client.post("/payment/create-preference", {
        productId,
        quantity,
        address,
    });
    return data;
};
