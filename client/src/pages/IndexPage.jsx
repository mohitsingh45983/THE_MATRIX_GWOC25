import Carousel from "../components/Carousel";
import Navbar from "../includes/Navbar";
import "../styles/navbar.css";

import VideoCaraousel from "../components/VideoCaraousel";
import TrendingVideoCarousel from "../components/TrendingVideoCarousel";

import NewProducts from "../components/NewProducts";
import Footer from "../includes/Footer";
import FeaturedCollections from "../components/FeaturedCollections";
import Bestseller from "../components/Bestseller";
import Wedding from "../components/Wedding";
import InstagramBanner from "../components/InstagramBanner";
import BridalWorld from "../components/BridalWorld";
import CustomerStories from "../components/CustomerStories";
import Spinner from "../components/Spinner";
import FAQ from "../components/FAQ";
import { useEffect } from "react";

const IndexPage = () => {
  useEffect(() => {
    // Check for hash in the URL
    const sectionId = window.location.hash;

    if (sectionId) {
      // If there's a hash, scroll to the corresponding section
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  return (
    <>
      {/* <Spinner /> */}
      <Navbar />
      <Carousel />
      <TrendingVideoCarousel />
      {/* <VideoCaraousel /> */}

      <NewProducts type="latest" />
      <FeaturedCollections />
      <Wedding />
      <Bestseller type="bestselling" />
      {/* <BridalWorld /> */}
      <InstagramBanner />
      <CustomerStories />
      <FAQ />
      <Footer />
    </>
  );
};

export default IndexPage;
