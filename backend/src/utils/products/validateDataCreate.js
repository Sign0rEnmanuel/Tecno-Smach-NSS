const validateDataCreate = (data) => {
    const {
        name,
        description,
        price,
        stock,
        category,
        image,
        brand,
        model,
        specifications,
    } = data;
    if (
        !name ||
        !description ||
        !price ||
        !stock ||
        !category ||
        !image ||
        !brand ||
        !model ||
        !specifications
    ) {
        const error = new Error("Faltan datos obligatorios");
        error.status = 400;
        throw error;
    }
    if (
        !specifications.system ||
        !specifications.screen ||
        !specifications.processor ||
        !specifications.ram ||
        !specifications.storage ||
        !specifications.battery ||
        !specifications.camera
    ) {
        const error = new Error("Faltan datos de especificaciones");
        error.status = 400;
        throw error;
    }
    return {
        name,
        description,
        price,
        stock,
        category,
        image,
        brand,
        model,
        specifications,
    };
};

export default validateDataCreate;
