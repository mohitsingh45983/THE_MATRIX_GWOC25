import { Link, useNavigate } from "react-router-dom";
import "../styles/wedding.css"; // Import custom CSS

const Wedding = () => {
  const navigate = useNavigate();
  return (
    <div className="wedding-container mb-5">
      <h2
        className="text-center"
        style={{
          fontSize: "1.25rem",
          fontWeight: "400",
          marginTop: "25px",
          marginBottom: "50px",
        }}
      >
        Wedding Specials
      </h2>

      <div className="wedding-grid">
        <div className="wedding-card wedding-image-container">
          <Link to="/product-listing">
            <img
              src="https://www.koskii.com/cdn/shop/products/koskii-black-sequins-georgette-designer-saree-saus0021890_black_4_1800x1800.jpg?v=1663334015"
              alt=""
              className="wedding-img"
            />
            <div className="wedding-title">Day Wedding</div>
            <button
              className="shop-now-btn"
              onClick={() => navigate("/product-listing/day-wedding")}
            >
              SHOP NOW
            </button>
          </Link>
        </div>
        <div className="wedding-card wedding-image-container">
          <Link to="/product-listing">
            <img
              src="https://www.koskii.com/cdn/shop/files/koskii-white-sequins-shimmergeorgette-designer-saree-saus0031899_white_1_1800x1800.jpg?v=1693978281"
              alt=""
              className="wedding-img"
            />
            <div className="wedding-title">Night Wedding</div>
            <button
              className="shop-now-btn"
              onClick={() => navigate("/product-listing/night-wedding")}
            >
              SHOP NOW
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wedding;
