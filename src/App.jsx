import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Events from "./components/Events";
import Videos from "./components/Videos";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import YouTube from "./components/YouTube";
import Activities from "./components/Activities";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      
      <Events />
      <YouTube />
      <About />
      <Activities />
      <Contact />
      <Footer />

    </>
  );
}

export default App;