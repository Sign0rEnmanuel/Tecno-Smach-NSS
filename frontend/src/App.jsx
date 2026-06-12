import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./middleware/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./page/Home.jsx";
import About from "./page/About.jsx";
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/nosotros" element={<About />} />
                <Route
                    path="/perfil"
                    element={
                        <ProtectedRoute>
                            <h1>Perfil</h1>
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
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
