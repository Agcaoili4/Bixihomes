import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutBixi from "./components/AboutBixi";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import TeamServices from "./components/TeamServices";
import ContactForm from "./components/ContactForm";
import News from "./components/News";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <AboutBixi />
      <AboutUs />
      <Services />
      <Gallery />
      <TeamServices />
      <ContactForm />
      <News />
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
}

export default App;
