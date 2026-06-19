import useProduct from "../hooks/useProduct.js";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "../styles/pages/Products.css";

export default function Products() {
    const { getAllProductsQuery } = useProduct();
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("categoria") || "all";

    const handleCategoryChange = (newCategory) => {
        setSearchParams({ categoria: newCategory });
    };

    const filteredProducts =
        category === "all"
            ? getAllProductsQuery.data
            : getAllProductsQuery.data?.filter(
                  (product) => product.category === category,
              );

    return (
        <div className="products">
            <div className="products-container">
                <h1>Productos Disponibles</h1>
                <div className="products-categories">
                    <button
                        className={`category-btn ${category === "all" ? "active" : ""}`}
                        onClick={() => handleCategoryChange("all")}
                    >
                        Todos
                    </button>
                    <button
                        className={`category-btn ${category === "smartphone" ? "active" : ""}`}
                        onClick={() => handleCategoryChange("smartphone")}
                    >
                        Smartphones
                    </button>
                    <button
                        className={`category-btn ${category === "laptop" ? "active" : ""}`}
                        onClick={() => handleCategoryChange("laptop")}
                    >
                        Laptops
                    </button>
                    <button
                        className={`category-btn ${category === "printer" ? "active" : ""}`}
                        onClick={() => handleCategoryChange("printer")}
                    >
                        Impresoras
                    </button>
                    <button
                        className={`category-btn ${category === "accessories" ? "active" : ""}`}
                        onClick={() => handleCategoryChange("accessories")}
                    >
                        Accesorios
                    </button>
                    <button
                        className={`category-btn ${category === "tv" ? "active" : ""}`}
                        onClick={() => handleCategoryChange("tv")}
                    >
                        Televisores
                    </button>
                    <button
                        className={`category-btn ${category === "camera" ? "active" : ""}`}
                        onClick={() => handleCategoryChange("camera")}
                    >
                        Cámaras
                    </button>
                </div>

                {getAllProductsQuery.isLoading && (
                    <div className="products-state">
                        <div className="loader"></div>
                        <p>Cargando catálogo...</p>
                    </div>
                )}

                {getAllProductsQuery.isError && (
                    <div className="products-state empty">
                        <p>
                            {getAllProductsQuery.error?.response?.data
                                ?.message ||
                                "Error al cargar los productos. Intenta de nuevo."}
                        </p>
                    </div>
                )}

                {!getAllProductsQuery.isLoading &&
                    !getAllProductsQuery.isError &&
                    filteredProducts?.length === 0 && (
                        <div className="products-state empty">
                            <p>No hay productos disponibles por el momento.</p>
                        </div>
                    )}

                <div className="products-grid">
                    {filteredProducts?.map((product) => (
                        <div key={product._id} className="product-card">
                            <div className="product-image-container">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                />
                            </div>
                            <div className="product-info">
                                <h2>{product.name}</h2>
                                <div className="product-badges">
                                    <span className="badge category">
                                        {product.category}
                                    </span>
                                    <span className="badge brand">
                                        {product.brand}
                                    </span>
                                </div>
                                <p className="description">
                                    {product.description}
                                </p>
                                <div className="product-meta">
                                    <span className="price">
                                        ${product.price}
                                    </span>
                                    <span className="stock">
                                        Stock: {product.stock}
                                    </span>
                                </div>
                            </div>
                            <div className="product-actions">
                                <Link to={`/productos/${product._id}`}>
                                    <button
                                        className="view-btn"
                                        onClick={() =>
                                            console.log("Ver", product)
                                        }
                                    >
                                        Ver detalle
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
