const validateDataLogin = (body) => {
    const { password, email } = body;
    if (!password || !email) {
        const error = new Error(
            "El email o la contraseña no pueden estar vacíos",
        );
        error.status = 400;
        throw error;
    }

    const passwordTrimmed = password.trim();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(email)) {
        const error = new Error("El email no es válido");
        error.status = 400;
        throw error;
    }
    if (passwordTrimmed.length < 6) {
        const error = new Error(
            "La contraseña debe tener al menos 6 caracteres",
        );
        error.status = 400;
        throw error;
    }

    return {
        password: passwordTrimmed,
        email: email.trim(),
    };
};

export default validateDataLogin;
