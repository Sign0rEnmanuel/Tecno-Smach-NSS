import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { register, login, profile } from "../services/auth.js";

const useAuth = () => {
    const queryClient = useQueryClient();

    const registerMutation = useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });

    const loginMutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });

    const profileQuery = useQuery({
        queryKey: ["profile"],
        queryFn: () => {
            const token = localStorage.getItem("token");
            if (!token) return null;
            return profile();
        },
        refetchOnWindowFocus: false,
        retry: false,
    });

    const logout = () => {
        localStorage.removeItem("token");
        queryClient.setQueryData(["profile"], null);
        queryClient.invalidateQueries({ queryKey: ["profile"] });
    };

    return {
        registerMutation,
        loginMutation,
        profileQuery,
        logout,
    };
};

export default useAuth;
