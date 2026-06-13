import { Link } from "react-router-dom";

export default function PaymentFailure() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "var(--primary-color)", color: "var(--text-primary-color)", textAlign: "center", padding: "2rem" }}>
            <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>❌</div>
            <h1 style={{ color: "#ef4444", fontSize: "2.5rem", marginBottom: "1rem" }}>¡Pago Fallido!</h1>
            <p style={{ fontSize: "1.2rem", color: "var(--text-secondary-color)", maxWidth: "500px", marginBottom: "2rem", lineHeight: "1.6" }}>
                Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.
            </p>
            <Link to="/productos" style={{ backgroundColor: "var(--tertiary-color)", color: "white", padding: "1rem 2rem", borderRadius: "12px", textDecoration: "none", fontWeight: "bold", fontSize: "1.1rem", transition: "transform 0.3s ease" }}>
                Volver a productos
            </Link>
        </div>
    );
}
