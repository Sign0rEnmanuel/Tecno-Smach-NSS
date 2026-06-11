const validateDataRegister = (body) => {
    const { username, password, email } = body;
    if (!username || !password || !email) {
        const error = new Error(
            "El nombre de usuario o la contraseña o el email no pueden estar vacíos",
        );
        error.status = 400;
        throw error;
    }

    const usernameTrimmed = username.trim();
    const passwordTrimmed = password.trim();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(email)) {
        const error = new Error("El email no es válido");
        error.status = 400;
        throw error;
    }
    if (usernameTrimmed.length < 3) {
        const error = new Error(
            "El nombre de usuario debe tener al menos 3 caracteres",
        );
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
        username: usernameTrimmed,
        password: passwordTrimmed,
        email: email.trim(),
    };
};

export default validateDataRegister;
