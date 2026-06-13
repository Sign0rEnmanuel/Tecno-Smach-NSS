import { Link, useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import "../styles/pages/Product.css";

export default function Product() {
    const { id } = useParams();
    const { getProductByIdQuery } = useProduct();
    const product = getProductByIdQuery(id);
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
                        <button className="buy-btn">
                            <span className="icon">🛒</span> Agregar al carrito
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
