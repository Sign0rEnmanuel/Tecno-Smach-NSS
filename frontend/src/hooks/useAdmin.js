import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, changeUserRole } from "../services/admin";
import { toast } from "sonner";

const useAdmin = () => {
    const queryClient = useQueryClient();

    const usersQuery = useQuery({
        queryKey: ["admin_users"],
        queryFn: getAllUsers,
        retry: 1,
    });

    const changeRoleMutation = useMutation({
        mutationFn: ({ userId, role }) => changeUserRole(userId, role),
        onSuccess: (data) => {
            queryClient.invalidateQueries(["admin_users"]);
            if (toast && toast.success) {
                toast.success(data.message || "Rol actualizado correctamente");
            } else {
                alert(data.message || "Rol actualizado correctamente");
            }
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Error al actualizar rol";
            if (toast && toast.error) {
                toast.error(message);
            } else {
                alert(message);
            }
        },
    });

    return {
        usersQuery,
        changeRoleMutation,
    };
};

export default useAdmin;
