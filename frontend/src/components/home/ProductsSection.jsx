import { Link } from "react-router-dom";
import "../../styles/components/home/ProductsSection.css";

export default function ProductsSection() {
    return (
        <section className="products-section">
            <div className="products-section-content">
                <Link to="/productos?categoria=laptops">
                    <h3 className="box-title">Laptops</h3>
                    <p className="box-description">
                        Desde las mas compactas hasta las mas potentes
                    </p>
                </Link>
                <Link to="/productos?categoria=smartphones">
                    <h3 className="box-title">Smartphones</h3>
                    <p className="box-description">
                        Desde las mas compactas hasta las mas potentes
                    </p>
                </Link>
                <Link to="/productos?categoria=impresoras">
                    <h3 className="box-title">Impresoras</h3>
                    <p className="box-description">
                        Desde las mas compactas hasta las mas potentes
                    </p>
                </Link>
            </div>
        </section>
    );
}
