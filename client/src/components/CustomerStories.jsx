import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/CustomerStories.css";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

const reviews = [
  {
    name: "Meera Kapoor",
    location: "Surat, India",
    review:
      "Every detail wowed! At the wedding, it stole the show; friends are eyeing KASHVI's collection online after this buzz.",
    link: "https://www.koskii.com/cdn/shop/files/koskii-purple-stonework-semicrepe-designer-saree-saus0034824_purple_1_1_1400x.jpg?v=1719829414",
  },
  {
    name: "Romika Nigam",
    location: "Surat, India",
    review:
      "KASHVI made my bridal journey a dream! Stunning bridal wear, impeccable service; felt extraordinary, like a princess.",
    link: "https://th.bing.com/th/id/R.c19d879cd1482e7efd496a14cc3273a2?rik=DHmYFMrkXq7qvQ&riu=http%3a%2f%2fwww.koskii.com%2fcdn%2fshop%2fproducts%2fkoskii-sea-green-stonework-satin-designer-saree-saus0022632_sea_green__1.jpg%3fv%3d1670485220&ehk=Hkig7iWqkVfwtyPWVdW3RB%2fuaQ1Vkp6%2f4ibOu5XI4ig%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    name: "Romika Nigam",
    location: "Surat, India",
    review:
      "The craftsmanship is just amazing. My wedding look was elevated with the perfect outfit from KASHVI.",
    link: "https://www.koskii.com/cdn/shop/products/koskii-black-sequins-georgette-designer-saree-saus0021890_black_4_1800x1800.jpg?v=1663334015",
  },
  {
    name: "Meera Kapoor",
    location: "Surat, India",
    review:
      "I felt like a queen in my bridal lehenga. The attention to detail is truly outstanding!",
    link: "https://www.koskii.com/cdn/shop/products/koskii-lavender-mirrorwork-net-designer-saree-saus0021303_lavender_3_1800x1800.jpg?v=1661854696",
  },
  {
    name: "Romika Nigam",
    location: "Surat, India",
    review:
      "Best wedding collection ever! My suit was elegant, stylish, and perfectly tailored.",
    link: "https://www.koskii.com/cdn/shop/products/koskii-peach-threadwork-semi-crepe-designer-saree-saus0022636_peach__4_1400x.jpg?v=1670488483",
  },
  {
    name: "Meera Kapoor",
    location: "Surat, India",
    review:
      "Absolutely stunning outfits! I received so many compliments on my wedding day.",
    link: "https://www.koskii.com/cdn/shop/files/koskii-white-sequins-shimmergeorgette-designer-saree-saus0031899_white_1_1800x1800.jpg?v=1693978281",
  },
];

const CustomerStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerSlide = 2;

  useEffect(() => {
    const interval = setInterval(() => {
      nextReview();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextReview = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + reviewsPerSlide) % reviews.length
    );
  };

  const prevReview = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - reviewsPerSlide + reviews.length) % reviews.length
    );
  };

  return (
    <div className="customer-stories mb-5">
      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: "400",
          marginTop: "0.2rem",
        }}
      >
        Customer Stories
      </h2>
      <div className="carousel-container">
        <button className="stories-prev-btn" onClick={prevReview}>
          <ArrowBackIosNewOutlinedIcon />
        </button>

        <div className="slider-wrapper">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              className="slider"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {reviews
                .slice(currentIndex, currentIndex + reviewsPerSlide)
                .map((review, index) => (
                  <div key={index} className="review-box">
                    <img
                      src={review.link}
                      alt="Customer"
                      className="review-image"
                    />
                    <div className="review-content">
                      <p className="review-text">"{review.review}"</p>
                      <p style={{ marginBottom: "0", fontWeight: "500" }}>
                        {review.name}
                      </p>
                      <p className="location">{review.location}</p>
                    </div>
                  </div>
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <button className="stories-next-btn" onClick={nextReview}>
          <ArrowForwardIosOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export default CustomerStories;
