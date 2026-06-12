import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import "../styles/pages/Register.css";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { registerMutation } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        registerMutation.mutate(
            { username, email, password },
            {
                onSuccess: () => {
                    navigate("/");
                },
            }
        );
    };

    return (
        <div className="register">
            <div className="register-container">
                <h1>Crear Cuenta</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {registerMutation.isError && (
                        <div className="auth-error">
                            {registerMutation.error?.response?.data?.error || "Error al registrar. Intenta de nuevo."}
                        </div>
                    )}
                    <button type="submit" disabled={registerMutation.isPending}>
                        {registerMutation.isPending ? "Registrando..." : "Registrarse"}
                    </button>
                </form>
            </div>
            <div className="register-footer">
                <p>
                    ¿Ya tienes una cuenta? <Link to="/login">Inicia Sesión</Link>
                </p>
            </div>
        </div>
    );
}
