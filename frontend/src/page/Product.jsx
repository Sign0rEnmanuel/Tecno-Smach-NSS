import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { createPaymentPreference } from "../services/payment";
import { toast } from "sonner";
import "../styles/pages/Product.css";

export default function Product() {
    const { id } = useParams();
    const { getProductByIdQuery } = useProduct();
    const product = getProductByIdQuery(id);
    const [isBuying, setIsBuying] = useState(false);

    const handleBuy = async () => {
        try {
            setIsBuying(true);
            const data = await createPaymentPreference(product._id, 1);
            if (data && data.init_point) {
                window.location.href = data.init_point;
            } else {
                toast.error("No se pudo obtener el enlace de pago");
                setIsBuying(false);
            }
        } catch (error) {
            console.error("Error al iniciar la compra", error);
            toast.error("Error al iniciar la compra");
            setIsBuying(false);
        }
    };

    if (!product) {
        return <div>Producto no encontrado</div>;
    }
    return (
        <div className="product-page">
            <div className="product-container">
                <div className="product-image-container">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                    />
                </div>
                <div className="product-info">
                    <div className="product-header">
                        <h1>{product.name}</h1>
                        <div className="product-badges">
                            <span className="badge category">
                                {product.category}
                            </span>
                            <span className="badge brand">{product.brand}</span>
                        </div>
                    </div>
                    <p className="description">{product.description}</p>
                    <div className="product-meta">
                        <span className="price">${product.price}</span>
                        <span className="stock">
                            Stock: {product.stock} disponibles
                        </span>
                    </div>
                    <div className="product-actions">
                        <button className="buy-btn" onClick={handleBuy} disabled={isBuying || product.stock <= 0}>
                            <span className="icon">🛒</span> {isBuying ? "Procesando..." : product.stock > 0 ? "Comprar ahora" : "Sin stock"}
                        </button>
                        <Link to="/productos" className="back-link">
                            Volver a productos
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
