import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import "../styles/pages/Login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginMutation } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        loginMutation.mutate(
            { email, password },
            {
                onSuccess: () => {
                    navigate("/");
                },
            }
        );
    };

    return (
        <div className="login">
            <div className="login-container">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
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
                    {loginMutation.isError && (
                        <div className="auth-error">
                            {loginMutation.error?.response?.data?.error || "Error al iniciar sesión. Verifica tus credenciales."}
                        </div>
                    )}
                    <button type="submit" disabled={loginMutation.isPending}>
                        {loginMutation.isPending ? "Iniciando..." : "Entrar"}
                    </button>
                </form>
            </div>
            <div className="login-footer">
                <p>
                    ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
                </p>
            </div>
        </div>
    );
}
