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
            queryClient.setQueryData(["allProducts"], (oldData) => {
                if (Array.isArray(oldData)) {
                    return [...oldData, data];
                }
                return [data];
            });
            queryClient.invalidateQueries({ queryKey: ["allProducts"] });
        },
    });

    const updateProductMutation = useMutation({
        mutationFn: ({ id, product }) => updateProductById(id, product),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allProducts"] });
        },
    });

    const deleteProductMutation = useMutation({
        mutationFn: deleteProductById,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["allProducts"] });
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
