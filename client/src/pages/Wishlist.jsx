import { useEffect, useState } from "react";
import "../styles/wishlist.css"; // Importing the CSS file
import Navbar from "../includes/Navbar";
import Footer from "../includes/Footer";
import BoltSharpIcon from "@mui/icons-material/BoltSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateWishlistCount } from "../redux/state";

const Wishlist = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  // Sample wishlist data (replace with API data if needed)
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);

  const user = useSelector((state) => state.user?.user);

  const userId = user?._id;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`${URL}/wishlist-related/get/${userId}`);
        const data = await response.json();

        console.log(data);

        if (data.success) {
          setWishlistItems(data.wishlist);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userId]);

  const fetchWishListLength = async (userId) => {
    try {
      const response = await fetch(`${URL}/auth/wishList/${userId}`);
      const data = await response.json();
      if (response.ok) {
        dispatch(updateWishlistCount(data));
      }
    } catch (error) {
      console.error("Error fetching cart length:", error);
    }
  };

  const handleBuyNow = (product) => {
    navigate("/buy-now", { state: { product } });
  };

  // Remove item from wishlist
  const removeFromWishlist = async (productId) => {
    if (!userId) return;
    try {
      const response = await fetch(`${URL}/wishlist-related/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = await response.json();
      if (data.success) {
        setWishlistItems(data.wishlist);
        fetchWishListLength(userId);
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="wishlist-container mt-4 mb-5">
        {/* Wishlist Header */}
        <div
          style={{ width: "100%", display: "flex", justifyContent: "start" }}
        >
          <h2 className="wishlist-title text-start">
            My Wishlist{" "}
            <span className="wishlist-count">{wishlistItems.length} items</span>
          </h2>
        </div>

        {/* Wishlist Items Grid */}
        <div className="wishlist-grid">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item) => (
              <div key={item._id} className="wishlist-item">
                {/* Remove Button */}
                <button
                  className="close-btn"
                  onClick={() => removeFromWishlist(item._id)}
                >
                  <FavoriteIcon />
                </button>

                {/* Product Image */}
                <Link to={`/product-details/${item._id}`}>
                  <div className="image-container">
                    <img
                      src={item.images?.[0] || "/placeholder.jpg"} // Handle missing images
                      alt={item.name || "Saree"}
                      className="wishlist-image"
                    />
                  </div>
                </Link>
                <div className="btn-container">
                  {" "}
                  <button
                    className="buy-now-btn"
                    onClick={() => {
                      handleBuyNow(item);
                    }}
                  >
                    BUY NOW
                  </button>
                </div>

                {/* Product Name & Price */}
                <p className="wishlist-item-name text-start">{item.name}</p>
                <p className="wishlist-item-price text-start">
                  {/* MRP <span className="price">₹ X,XXX</span> */}
                </p>

                {/* Ready to Ship */}
                <div className="ready-to-ship text-start">
                  <BoltSharpIcon fontSize="xs" /> Ready To Ship
                </div>
              </div>
            ))
          ) : (
            <div
              className="mt-5"
              style={{ width: "100vw", marginBottom: "150px" }}
            >
              <img
                src="/images/man-question-marks-dark.png"
                alt=""
                style={{ width: "170px", height: "230px" }}
              />
              <p className="empty-wishlist">Your wishlist is empty.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
