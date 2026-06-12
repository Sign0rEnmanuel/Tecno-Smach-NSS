import InitialSection from "../components/home/InitialSection.jsx";
import InfoSection from "../components/home/InfoSection.jsx";
import ProductsSection from "../components/home/ProductsSection.jsx";

export default function Home() {
    return (
        <div className="home-container">
            <InitialSection />
            <InfoSection />
            <ProductsSection />
        </div>
    );
}
