import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMyOrders, getAllOrders, updateDeliveryStatus } from "../services/order";
import { toast } from "sonner";

const useOrder = () => {
    const queryClient = useQueryClient();

    const myOrdersQuery = useQuery({
        queryKey: ["my_orders"],
        queryFn: getMyOrders,
        retry: 1,
    });

    const allOrdersQuery = useQuery({
        queryKey: ["all_orders"],
        queryFn: getAllOrders,
        retry: 1,
    });

    const updateDeliveryMutation = useMutation({
        mutationFn: ({ orderId, deliveryStatus }) => updateDeliveryStatus(orderId, deliveryStatus),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["all_orders"] });
            queryClient.invalidateQueries({ queryKey: ["my_orders"] });
            if (toast && toast.success) {
                toast.success(data.message || "Estado actualizado");
            } else {
                alert(data.message || "Estado actualizado");
            }
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Error al actualizar estado";
            if (toast && toast.error) {
                toast.error(message);
            } else {
                alert(message);
            }
        },
    });

    return {
        myOrdersQuery,
        allOrdersQuery,
        updateDeliveryMutation,
    };
};

export default useOrder;
