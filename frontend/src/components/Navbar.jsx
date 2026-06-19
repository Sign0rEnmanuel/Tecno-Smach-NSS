import { useState } from "react";
import { Link } from "react-router-dom";
import LogoNavbar from "../assets/logo-navbar.svg";
import useAuth from "../hooks/useAuth.js";
import "../styles/components/Navbar.css";

export default function Navbar() {
    const { profileQuery } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header className="header">
            <div className="header-logo">
                <img src={LogoNavbar} alt="Logo de la aplicación" />
                <h2>Tecno-Smach-NSS</h2>
            </div>

            {/* Hamburger button */}
            <button
                className={`hamburger ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Abrir menú"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav className={`header-nav ${menuOpen ? "nav-open" : ""}`}>
                <Link to="/" onClick={closeMenu}>
                    <button className="nav-btn">Inicio</button>
                </Link>
                <Link to="/productos" onClick={closeMenu}>
                    <button className="nav-btn">Productos</button>
                </Link>
                <Link to="/nosotros" onClick={closeMenu}>
                    <button className="nav-btn">Nosotros</button>
                </Link>
                {profileQuery.data ? (
                    <>
                        <Link to="/perfil" onClick={closeMenu}>
                            <button className="nav-btn">Perfil</button>
                        </Link>
                        {profileQuery.data.role === "admin" && (
                            <Link to="/dashboard" onClick={closeMenu}>
                                <button className="nav-btn">Dashboard</button>
                            </Link>
                        )}
                    </>
                ) : (
                    <Link to="/login" onClick={closeMenu}>
                        <button className="nav-btn">Iniciar sesión</button>
                    </Link>
                )}
            </nav>
        </header>
    );
}
