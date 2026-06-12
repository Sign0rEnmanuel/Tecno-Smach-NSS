import InitialSection from "../components/about/InitialSection.jsx";
import InfoSection from "../components/about/InfoSection.jsx";
import ContactSection from "../components/about/ContactSection.jsx";

export default function About() {
    return (
        <div className="about-page">
            <InitialSection />
            <InfoSection />
            <ContactSection />
        </div>
    );
}
