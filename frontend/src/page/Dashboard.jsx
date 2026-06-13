import { Routes, Route, Link } from "react-router-dom";
import "../styles/pages/Dashboard.css";

export default function Dashboard() {
    return (
        <div className="dashboard">
            <nav className="dashboard-nav">
                <Link to="/dashboard/" className="dashboard-btn">
                    <button>Usuarios</button>
                </Link>
                <Link to="/dashboard/productos" className="dashboard-btn">
                    <button>Productos</button>
                </Link>
                <Link to="/dashboard/pedidos" className="dashboard-btn">
                    <button>Pedidos</button>
                </Link>
            </nav>
            <main className="dashboard-main">
                <Routes>
                    <Route path="/" element={<h2>Pagina principal</h2>} />
                    <Route path="/productos" element={<h2>Productos</h2>} />
                    <Route path="/pedidos" element={<h2>Pedidos</h2>} />
                </Routes>
            </main>
        </div>
    );
}
