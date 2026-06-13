import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./middleware/ProtectedRoute.jsx";
import AdminRoute from "./middleware/AdminRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./page/Home.jsx";
import About from "./page/About.jsx";
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";
import Profile from "./page/Profile.jsx";
import Products from "./page/Products.jsx";
import Product from "./page/Product.jsx";
import Dashboard from "./page/Dashboard.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/productos" element={<Products />} />
                <Route path="/productos/:id" element={<Product />} />
                <Route
                    path="/perfil"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/carrito"
                    element={
                        <ProtectedRoute>
                            <h1>Carrito</h1>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/*"
                    element={
                        <AdminRoute>
                            <Dashboard />
                        </AdminRoute>
                    }
                />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
