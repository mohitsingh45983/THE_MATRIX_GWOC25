import { useState, useEffect } from "react";

export default function Carousel() {
  const [imageStyles, setImageStyles] = useState({
    height: "100vh",
  });

  useEffect(() => {
    const updateStyles = () => {
      if (window.innerWidth < 480) {
        setImageStyles({ height: "85vh" });
      } else if (window.innerWidth < 768) {
        setImageStyles({ height: "100vh" });
      } else if (window.innerWidth < 1024) {
        setImageStyles({ height: "100vh" });
      } else if (window.innerWidth <= 1440) {
        setImageStyles({ height: "100vh" });
      }
    };

    updateStyles(); // Set initial styles
    window.addEventListener("resize", updateStyles);
    return () => window.removeEventListener("resize", updateStyles);
  }, []);

  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators" style={{ marginBottom: "120px" }}>
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="carousel-inner">
        {[
          {
            src: "https://i.pinimg.com/originals/4e/99/1e/4e991e5927f98f74ca05b507811ba539.jpg",
            caption1: "Curating Every",
            caption2: "Wedding Emotion",
          },
          {
            src: "https://assets.vogue.in/photos/5ce41bf11dc2676095c774db/16:9/w_1280,c_limit/Anita-Dongres-Pichhwai-Collection.jpg",
            caption1: "Simple celebrations,",
            caption2: "Timeless memories!",
          },
          {
            src: "https://i.pinimg.com/originals/67/0e/49/670e49f72ecd161dc2e8972b5b9ba54d.jpg",
            caption1: "Making Every Bride's",
            caption2: "Dream Come True",
          },
        ].map((slide, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            data-bs-interval="3000"
            style={{ cursor: "pointer" }}
          >
            <img
              src={slide.src}
              className="d-block w-100"
              style={{
                width: "100%",
                height: imageStyles.height, // Responsive height
                objectFit: "cover",
                filter: "brightness(70%)",
              }}
              alt="..."
            />
            <div className="carousel-caption" style={{ marginBottom: "130px" }}>
              <h6 style={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)" }}>
                <i>{slide.caption1}</i>
              </h6>
              <h3 style={{ color: "white" }}>{slide.caption2}</h3>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
