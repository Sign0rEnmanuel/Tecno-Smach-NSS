import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./page/Home.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<h1>Login</h1>} />
                <Route path="/nosotros" element={<h1>Nosotros</h1>} />
                <Route path="/perfil" element={<h1>Perfil</h1>} />
                <Route path="/carrito" element={<h1>Carrito</h1>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}
