import Product from "../schemas/Product.js";
import validateDataCreate from "../utils/products/validateDataCreate.js";

export const allProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res
                .status(404)
                .json({ message: "No hay productos en la base de datos" });
        }
        return res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Error al obtener productos" });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res
                .status(404)
                .json({ message: "No se ha encontrado el producto" });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener producto" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const product = validateDataCreate(req.body);
        const newProduct = await Product.create(product);
        return res.status(201).json(newProduct);
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({ message: error.message });
        }
        console.log(error.message);
        return res.status(500).json({ message: "Error al crear producto" });
    }
};

export const updateProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = validateDataCreate(req.body);
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {
            new: true,
        });
        if (!updatedProduct) {
            return res
                .status(404)
                .json({ message: "No se ha encontrado el producto" });
        }
        return res.status(200).json({ message: "Producto actualizado" });
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({ message: error.message });
        }
        console.log(error.message);
        return res
            .status(500)
            .json({ message: "Error al actualizar producto" });
    }
};

export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res
                .status(404)
                .json({ message: "No se ha encontrado el producto" });
        }
        return res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({ message: error.message });
        }
        console.log(error.message);
        return res.status(500).json({ message: "Error al eliminar producto" });
    }
};
