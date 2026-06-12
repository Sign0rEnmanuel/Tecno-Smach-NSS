import InitialSection from "../components/InitialSection.jsx";
import InfoSection from "../components/InfoSection.jsx";
import ProductsSection from "../components/ProductsSection.jsx";

const Home = () => {
    return (
        <div className="home-container">
            <InitialSection />
            <InfoSection />
            <ProductsSection />
        </div>
    );
};

export default Home;
