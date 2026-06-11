import { Link } from "react-router-dom";
import LogoNavbar from "../assets/logo-navbar.svg";
import useAuth from "../hooks/useAuth.js";

export default function Navbar() {
    const { profileQuery, logout } = useAuth();
    return (
        <header className="header">
            <div className="header-logo">
                <img src={LogoNavbar} alt="Logo de la aplicación" />
                <h2>Tecno-Smach-NSS</h2>
            </div>
            <nav className="header-nav">
                <Link to="/">
                    <button className="nav-btn">Inicio</button>
                </Link>
                <Link to="/nosotros">
                    <button className="nav-btn">Nosotros</button>
                </Link>
                {profileQuery.data ? (
                    <>
                        <Link to="/perfil">
                            <button className="nav-btn">Perfil</button>
                        </Link>
                        <Link to="/carrito">
                            <button className="nav-btn">Carrito</button>
                        </Link>
                        <button
                            className="nav-btn"
                            onClick={logout}
                            type="button"
                        >
                            Cerrar sesión
                        </button>
                    </>
                ) : (
                    <Link to="/login">
                        <button className="nav-btn">Iniciar sesión</button>
                    </Link>
                )}
            </nav>
        </header>
    );
}
