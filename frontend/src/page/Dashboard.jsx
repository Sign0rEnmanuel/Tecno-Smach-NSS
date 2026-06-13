import { Routes, Route, Link, useLocation } from "react-router-dom";
import DashboardUsers from "../components/dashboard/users/DashboardUsers.jsx";
import DashboardProducts from "../components/dashboard/products/DashboardProducts.jsx";
import DashboardOrders from "../components/dashboard/orders/DashboardOrders.jsx";
import "../styles/pages/Dashboard.css";

export default function Dashboard() {
    const location = useLocation();

    return (
        <div className="dashboard">
            <nav className="dashboard-nav">
                <Link to="/dashboard/" className={`dashboard-btn ${location.pathname === "/dashboard/" ? "active" : ""}`}>
                    <button>Usuarios</button>
                </Link>
                <Link to="/dashboard/productos" className={`dashboard-btn ${location.pathname === "/dashboard/productos" ? "active" : ""}`}>
                    <button>Productos</button>
                </Link>
                <Link to="/dashboard/pedidos" className={`dashboard-btn ${location.pathname === "/dashboard/pedidos" ? "active" : ""}`}>
                    <button>Pedidos</button>
                </Link>
            </nav>
            <main className="dashboard-main">
                <Routes>
                    <Route path="/" element={<DashboardUsers />} />
                    <Route path="/productos" element={<DashboardProducts />} />
                    <Route path="/pedidos" element={<DashboardOrders />} />
                </Routes>
            </main>
        </div>
    );
}
