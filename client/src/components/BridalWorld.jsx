import { Link } from "react-router-dom";
import "../styles/bridalworld.css";

export default function BridalWorld() {
  return (
    <div className="bridal-container mb-5">
      {/* Background Image */}
      <img
        src="/images/1739466271420.jpg"
        alt="Bridal World"
        className="bridal-image"
      />

      {/* Overlay Text */}
      <div className="bridal-text">
        <h1>Bridal World</h1>
        <p>Most Special Looks For Your Dream Day</p>
        <Link to="/product-listing">
          <button className="bridal-shop-now-btn">Shop Now</button>
        </Link>
      </div>
    </div>
  );
}
