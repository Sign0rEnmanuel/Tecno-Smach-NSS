import { Link } from "react-router-dom";
import "../../styles/components/home/InitialSection.css";

export default function InitialSection() {
    return (
        <section className="initial-section">
            <div className="initial-section-content">
                <div className="landing-be-content">
                    <p>💻</p>
                    <h2>Tecno-Smach-NSS</h2>
                </div>
                <div className="landing-title">
                    <h1>La plataforma de compra de Smach</h1>
                    <p>
                        Conoce nuestra plataforma de compra de Smach, la mejor
                        opción para encontrar y comprar Smach.
                    </p>
                </div>
                <div className="landing-btn">
                    <Link to="/productos">
                        <button className="btn-primary">Ver productos</button>
                    </Link>
                    <Link to="/nosotros">
                        <button className="btn-secondary">Nosotros</button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
