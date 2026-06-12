import { Link } from "react-router-dom";
import "../styles/components/Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="text">
                    <h2>Tecno-Smach-NSS</h2>
                    <p>
                        Encuentra todo lo que necesitas en tecnología en un solo
                        lugar. Productos de calidad y precios competitivos.
                    </p>
                </div>
                <div className="navigation">
                    <h2>Navegacion</h2>
                    <nav className="navigation-nav">
                        <li>
                            <Link to="/">Inicio</Link>
                        </li>
                        <li>
                            <Link to="/productos">Productos</Link>
                        </li>
                        <li>
                            <Link to="/contacto">Contacto</Link>
                        </li>
                    </nav>
                </div>
                <div className="contacto">
                    <h2>Contacto</h2>
                    <nav className="contacto-nav">
                        <li>
                            <a href="mailto:[EMAIL_ADDRESS]">
                                tecnosmach@gmail.com
                            </a>
                        </li>
                        <li>
                            <a href="tel:+123456789">+55 (41) 98437-6816</a>
                        </li>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
