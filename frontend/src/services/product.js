import client from "./client.js";

export const getAllProducts = async () => {
    const response = await client.get("/product/all");
    return response.data;
};

export const getProductById = async (id) => {
    const response = await client.get(`/product/all/${id}`);
    return response.data;
};

export const createProduct = async (product) => {
    const response = await client.post("/product/create", product);
    return response.data;
};

export const updateProductById = async (id, product) => {
    const response = await client.put(`/product/update/${id}`, product);
    return response.data;
};

export const deleteProductById = async (id) => {
    const response = await client.delete(`/product/delete/${id}`);
    return response.data;
};
