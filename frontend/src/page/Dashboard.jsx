import { Routes, Route, Link, useLocation } from "react-router-dom";
import DashboardUsers from "../components/dashboard/users/DashboardUsers.jsx";
import DashboardProducts from "../components/dashboard/products/DashboardProducts.jsx";
import DashboardOrders from "../components/dashboard/orders/DashboardOrders.jsx";
import "../styles/pages/Dashboard.css";

const NAV_LINKS = [
    { to: "/dashboard/", label: "Usuarios" },
    { to: "/dashboard/productos", label: "Productos" },
    { to: "/dashboard/pedidos", label: "Pedidos" },
];

export default function Dashboard() {
    const location = useLocation();
    return (
        <div className="dashboard">
            <nav className="dashboard-nav">
                {NAV_LINKS.map(({ to, label }) => {
                    const isActive = location.pathname === to;
                    return (
                        <Link
                            key={to}
                            to={to}
                            className={`dashboard-nav-link ${isActive ? "active" : ""}`}
                        >
                            {label}
                        </Link>
                    );
                })}
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
