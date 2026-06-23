import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { createPaymentPreference } from "../services/payment";
import { toast } from "sonner";
import "../styles/pages/Product.css";

const brazilStates = [
    { value: "", label: "Selecciona un estado" },
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' }
];

export default function Product() {
    const { id } = useParams();
    const { getAllProductsQuery, getProductByIdQuery } = useProduct();
    const product = getProductByIdQuery(id);
    const [isBuying, setIsBuying] = useState(false);
    
    const [address, setAddress] = useState({
        zipCode: "",
        state: "",
        city: "",
        neighborhood: "",
        street: "",
        number: "",
        complement: ""
    });

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleBuy = async () => {
        if (!address.zipCode || !address.state || !address.city || !address.neighborhood || !address.street || !address.number) {
            toast.error("Por favor completa todos los campos obligatorios de la dirección de entrega");
            return;
        }

        try {
            setIsBuying(true);
            const data = await createPaymentPreference(product._id, 1, address);
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

    if (getAllProductsQuery.isLoading) {
        return (
            <div className="product-page">
                <div className="product-page-loading">
                    <div className="loader"></div>
                    <p>Cargando producto...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-page">
                <div className="product-page-error">
                    <p>Producto no encontrado</p>
                </div>
            </div>
        );
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

                    <div className="address-section">
                        <h3>Dirección de Entrega (Brasil)</h3>
                        <div className="address-form">
                            <div className="form-group row-2">
                                <input type="text" name="zipCode" value={address.zipCode} onChange={handleAddressChange} placeholder="CEP *" className="address-input" />
                                <select name="state" value={address.state} onChange={handleAddressChange} className="address-input">
                                    {brazilStates.map(state => (
                                        <option key={state.value} value={state.value}>{state.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group row-2">
                                <input type="text" name="city" value={address.city} onChange={handleAddressChange} placeholder="Ciudad *" className="address-input" />
                                <input type="text" name="neighborhood" value={address.neighborhood} onChange={handleAddressChange} placeholder="Bairro *" className="address-input" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="street" value={address.street} onChange={handleAddressChange} placeholder="Rua / Calle *" className="address-input" />
                            </div>
                            <div className="form-group row-2">
                                <input type="text" name="number" value={address.number} onChange={handleAddressChange} placeholder="Número *" className="address-input" />
                                <input type="text" name="complement" value={address.complement} onChange={handleAddressChange} placeholder="Complemento (Opcional)" className="address-input" />
                            </div>
                        </div>
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
