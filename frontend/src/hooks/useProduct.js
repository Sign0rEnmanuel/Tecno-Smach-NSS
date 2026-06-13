import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAllProducts,
    createProduct,
    updateProductById,
    deleteProductById,
} from "../services/product.js";

const useProduct = () => {
    const queryClient = useQueryClient();

    const getAllProductsQuery = useQuery({
        queryKey: ["allProducts"],
        queryFn: () => getAllProducts(),
        refetchOnWindowFocus: false,
        retry: false,
    });

    const getProductByIdQuery = (id) => {
        return getAllProductsQuery.data?.find((product) => product._id === id);
    };

    const createProductMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: (data) => {
            queryClient.setQueryData(["allProducts"], (oldData) => [
                ...oldData,
                data,
            ]);
        },
    });

    const updateProductMutation = useMutation({
        mutationFn: updateProductById,
        onSuccess: (data) => {
            queryClient.setQueryData(["allProducts"], (oldData) => {
                const index = oldData.findIndex(
                    (product) => product._id === data._id,
                );
                if (index === -1) return oldData;
                oldData[index] = data;
                return oldData;
            });
        },
    });

    const deleteProductMutation = useMutation({
        mutationFn: deleteProductById,
        onSuccess: (data) => {
            queryClient.setQueryData(["allProducts"], (oldData) => {
                const index = oldData.findIndex(
                    (product) => product._id === data._id,
                );
                if (index === -1) return oldData;
                oldData.splice(index, 1);
                return oldData;
            });
        },
    });

    return {
        getAllProductsQuery,
        getProductByIdQuery,
        createProductMutation,
        updateProductMutation,
        deleteProductMutation,
    };
};

export default useProduct;
