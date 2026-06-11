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
        queryFn: profile,
        enabled: !!localStorage.getItem("token"),
        refetchOnWindowFocus: false,
    });

    const logout = () => {
        localStorage.removeItem("token");
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
