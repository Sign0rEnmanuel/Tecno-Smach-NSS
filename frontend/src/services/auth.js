import client from "./client.js";

export const register = async ({ username, password, email }) => {
    const response = await client.post("/auth/register", {
        username,
        password,
        email,
    });
    return response.data;
};

export const login = async ({ email, password }) => {
    const response = await client.post("/auth/login", {
        email,
        password,
    });
    return response.data;
};

export const profile = async () => {
    const response = await client.get("/auth/profile");
    return response.data;
};
