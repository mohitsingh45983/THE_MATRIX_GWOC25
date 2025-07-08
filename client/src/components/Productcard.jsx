import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BoltSharpIcon from "@mui/icons-material/BoltSharp";
import "../styles/flash.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/productcard.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateWishlistCount } from "../redux/state";
import { useDispatch } from "react-redux";

const ProductCard = ({ product, userId }) => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [flash, setFlash] = useState("");
  const [flashImage, setFlashImage] = useState(null);
  const [flashVisible, setFlashVisible] = useState(false);
  const dispatch = useDispatch();

  const showFlash = (message, imageUrl, duration = 1000) => {
    setFlash(message);
    setFlashImage(imageUrl);
    setTimeout(() => {
      setFlashVisible(true);
    }, 10);
    setTimeout(() => {
      setFlashVisible(false);
      setTimeout(() => {
        setFlash("");
      }, 500);
    }, duration);
  };

  console.log(userId);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(`${URL}/wishlist-related/get/${userId}`);
        const data = await response.json();
        // setIsWishlisted(data.wishlist.includes(product._id));
        setIsWishlisted(data.wishlist.some((i) => i._id === product._id));
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    if (userId) {
      fetchWishlist();
    }
  }, [userId, product._id]);

  const handleWishlistToggle = async () => {
    try {
      const response = await fetch(`${URL}/wishlist-related/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id }),
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setIsWishlisted((prev) => !prev);
        fetchWishListLength(userId);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const fetchWishListLength = async (userId) => {
    try {
      const response = await fetch(`${URL}/auth/wishList/${userId}`);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        dispatch(updateWishlistCount(data));
      }
    } catch (error) {
      console.error("Error fetching cart length:", error);
    }
  };

  return (
    <>
      {/* Flash Modal */}
      {flash && (
        <div className={`flash-container ${flashVisible ? "visible" : ""}`}>
          <div className="flash-modal">
            <img
              className="flash-icon"
              src={flashImage}
              alt="Cart Illustration"
            />
            <h2 className="flash-text">{flash}</h2>
          </div>
        </div>
      )}
      <div className="product-card">
        {/* Wishlist Icon */}
        <div className="wishlist-icon" onClick={handleWishlistToggle}>
          {isWishlisted ? (
            <FavoriteIcon fontSize="medium" />
          ) : (
            <FavoriteBorderOutlinedIcon fontSize="medium" />
          )}
        </div>

        {/* Product Image */}
        <Link
          to={`/product-details/${product._id}`}
          style={{ textDecoration: "none" }}
        >
          <img
            src={product.images[0]}
            alt="Green Khaddi Georgette Bandhani Saree"
            className="product-img"
          />

          {/* Product Details */}
          {/* Product Name & Price */}

          <p className="wishlist-item-name-card">{product.name}</p>
          <p
            className="wishlist-item-price text-start"
            style={{ marginTop: "0" }}
          >
            {/* MRP <span className="price">₹ X,XXX</span> */}
          </p>
        </Link>

        {/* Ready to Ship Badge */}
        <div className="ready-to-ship text-start">
          <BoltSharpIcon fontSize="xs" /> Ready To Ship
        </div>
      </div>
    </>
  );
};

export default ProductCard;
