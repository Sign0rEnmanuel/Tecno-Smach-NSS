import { useState } from "react";
import useProduct from "../../../hooks/useProduct";
import CreateProduct from "./CreateProduct";
import EditProduct from "./EditProduct";
import "../../../styles/components/dashboard/products/DashboardProducts.css";

export default function DashboardProducts() {
    const {
        getAllProductsQuery,
        createProductMutation,
        updateProductMutation,
        deleteProductMutation,
    } = useProduct();

    const [showCreate, setShowCreate] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleDelete = (id) => {
        if (
            window.confirm(
                "¿Estás seguro de que deseas eliminar este producto?",
            )
        ) {
            deleteProductMutation.mutate(id);
        }
    };

    if (getAllProductsQuery.isLoading)
        return <div className="loading-products">Cargando productos...</div>;
    if (getAllProductsQuery.isError)
        return <div className="error-products">Error al cargar productos</div>;

    return (
        <div className="dashboard-products-container">
            <div className="dashboard-products-header">
                <h2>Gestión de Productos</h2>
                <button
                    className="add-product-btn"
                    onClick={() => setShowCreate(true)}
                >
                    + Nuevo Producto
                </button>
            </div>

            <div className="products-table-wrapper">
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllProductsQuery.data?.map((product) => (
                            <tr key={product._id}>
                                <td data-label="Producto">
                                    <div className="product-item">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                        />
                                        <div className="product-item-info">
                                            <span className="product-item-name">
                                                {product.name}
                                            </span>
                                            <span className="product-item-brand">
                                                {product.brand}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td
                                    data-label="Categoría"
                                    style={{ textTransform: "capitalize" }}
                                >
                                    {product.category}
                                </td>
                                <td
                                    data-label="Precio"
                                    className="product-price"
                                >
                                    ${product.price}
                                </td>
                                <td data-label="Stock">
                                    <span
                                        className={`product-stock ${product.stock <= 5 ? "low" : ""}`}
                                    >
                                        {product.stock}
                                    </span>
                                </td>
                                <td data-label="Acciones">
                                    <div className="product-actions">
                                        <button
                                            className="edit-btn"
                                            onClick={() =>
                                                setEditingProduct(product)
                                            }
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDelete(product._id)
                                            }
                                            disabled={
                                                deleteProductMutation.isPending
                                            }
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showCreate && (
                <CreateProduct
                    onClose={() => setShowCreate(false)}
                    createProductMutation={createProductMutation}
                />
            )}

            {editingProduct && (
                <EditProduct
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    updateProductMutation={updateProductMutation}
                />
            )}
        </div>
    );
}
