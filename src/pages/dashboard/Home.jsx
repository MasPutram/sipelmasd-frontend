import { useRef } from "react";
import NavbarUser from "../../components/Navbar/Users/NavbarUser";
import SectionHero from "../../components/Navbar/Users/Hero";
import SectionTrending from "../../components/Navbar/Users/Trending";
import SectionGaleri from "../../components/Navbar/Users/Galeri";
import SectionReport from "../../components/Form/Report";
import SectionFooter from "../../components/Footer/Footer";

const Home = () => {
  const heroRef = useRef();
  const trendingRef = useRef();
  const galeriRef = useRef();
  const reportRef = useRef();
  const footerRef = useRef();

  return (
    <div>
      <NavbarUser scrollTo={{ heroRef, trendingRef, galeriRef, reportRef }} />

      <div ref={heroRef}><SectionHero /></div>
      <div ref={trendingRef}><SectionTrending /></div>
      <div ref={galeriRef}><SectionGaleri /></div>
      <div ref={reportRef}><SectionReport /></div>
      <div ref={footerRef}><SectionFooter /></div>
    </div>
  );
};

export default Home;
