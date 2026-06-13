import client from "./client";

export const getAllUsers = async () => {
    const { data } = await client.get("/admin/users");
    return data;
};

export const changeUserRole = async (userId, role) => {
    const { data } = await client.put(`/admin/users/${userId}/role`, { role });
    return data;
};
