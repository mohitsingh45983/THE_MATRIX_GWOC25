import "../styles/InstagramBanner.css";

const InstagramBanner = () => {
  const instagramURL = "https://www.instagram.com/kashvi_saree_/"; // Replace with your actual Instagram link

  return (
    <div
      className="instagram-banner mb-5"
      onClick={() => window.open(instagramURL, "_blank")}
    >
      <div className="overlay">
        <h2 style={{ fontSize: "24px", fontWeight: "200" }}>
          VISIT OUR INSTAGRAM DIARIES
        </h2>
        <p style={{ fontSize: "12px", fontWeight: "100" }}>
          FOLLOW TO KNOW MORE
        </p>
      </div>
    </div>
  );
};

export default InstagramBanner;
