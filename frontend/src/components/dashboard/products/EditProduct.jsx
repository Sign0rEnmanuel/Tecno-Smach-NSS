import { useState } from "react";
import "../../../styles/components/dashboard/products/ProductForm.css";

const CATEGORIES = ["smartphone", "laptop", "printer", "accessories", "tv", "camera"];

export default function EditProduct({ product, onClose, updateProductMutation }) {
    const [form, setForm] = useState({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        image: product.image,
        brand: product.brand,
        model: product.model,
        specifications: {
            system: product.specifications?.system || "",
            screen: product.specifications?.screen || "",
            processor: product.specifications?.processor || "",
            ram: product.specifications?.ram || "",
            storage: product.specifications?.storage || "",
            battery: product.specifications?.battery || "",
            camera: product.specifications?.camera || "",
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSpecChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            specifications: { ...prev.specifications, [name]: value },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            price: Number(form.price),
            stock: Number(form.stock),
        };
        updateProductMutation.mutate(
            { id: product._id, product: payload },
            { onSuccess: () => onClose() }
        );
    };

    return (
        <div className="product-form-overlay" onClick={onClose}>
            <div className="product-form-modal" onClick={(e) => e.stopPropagation()}>
                <h2>Editar Producto</h2>
                <form className="product-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input name="name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Marca</label>
                            <input name="brand" value={form.brand} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Modelo</label>
                            <input name="model" value={form.model} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Categoría</label>
                            <select name="category" value={form.category} onChange={handleChange}>
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>Descripción</label>
                        <textarea name="description" value={form.description} onChange={handleChange} required />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Precio (BRL)</label>
                            <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Stock</label>
                            <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="form-group full-width">
                        <label>URL de Imagen</label>
                        <input name="image" value={form.image} onChange={handleChange} required />
                    </div>

                    <span className="form-section-title">Especificaciones</span>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Sistema Operativo</label>
                            <input name="system" value={form.specifications.system} onChange={handleSpecChange} required />
                        </div>
                        <div className="form-group">
                            <label>Pantalla</label>
                            <input name="screen" value={form.specifications.screen} onChange={handleSpecChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Procesador</label>
                            <input name="processor" value={form.specifications.processor} onChange={handleSpecChange} required />
                        </div>
                        <div className="form-group">
                            <label>RAM</label>
                            <input name="ram" value={form.specifications.ram} onChange={handleSpecChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Almacenamiento</label>
                            <input name="storage" value={form.specifications.storage} onChange={handleSpecChange} required />
                        </div>
                        <div className="form-group">
                            <label>Batería</label>
                            <input name="battery" value={form.specifications.battery} onChange={handleSpecChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Cámara</label>
                            <input name="camera" value={form.specifications.camera} onChange={handleSpecChange} required />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="form-cancel-btn" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="form-submit-btn" disabled={updateProductMutation.isPending}>
                            {updateProductMutation.isPending ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
