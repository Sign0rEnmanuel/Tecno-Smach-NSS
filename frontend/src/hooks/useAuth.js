import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { register, login, profile } from "../services/auth.js";

const useAuth = () => {
    const queryClient = useQueryClient();

    const registerMutation = useMutation(register, {
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
    const loginMutation = useMutation(login, {
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });

    const profileQuery = useQuery(["profile"], profile, {
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
        },
        refetchOnWindowFocus: false,
    });

    return {
        registerMutation,
        loginMutation,
        profileQuery,
    };
};

export default useAuth;
