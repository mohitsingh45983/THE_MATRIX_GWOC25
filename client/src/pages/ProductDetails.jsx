import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Get productId from URL
import "../styles/productDetails.css";
import "../styles/flash.css";
import Navbar from "../includes/Navbar";
import Footer from "../includes/Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/material";
import NewProducts from "../components/NewProducts";
import { setCartLength } from "../redux/state";

const ProductDetails = () => {
  const temp = import.meta.env.VITE_BACKEND_URL;
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Flash message states
  const [flash, setFlash] = useState("");
  const [flashImage, setFlashImage] = useState(null);
  const [flashVisible, setFlashVisible] = useState(false);

  // Lightbox states
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [fadeState, setFadeState] = useState("fade-in");

  const items = [
    "100% Purchase Protection",
    "5 days easy returns",
    "Assured Quality",
    "Free shipping*",
  ];

  // Helper function to show flash messages with fade in/out transition.
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

  // Zoom effect state
  const [zoomPosition, setZoomPosition] = useState({
    x: 50,
    y: 50,
    show: false,
  });
  const [selectedImage, setSelectedImage] = useState([]);

  const [deliveryDate, setDeliveryDate] = useState("");

  const user = useSelector((state) => state.user?.user);
  const userId = user?._id;
  const navigate = useNavigate();

  const handleBuyNow = () => {
    if (!user?._id) {
      showFlash("Please log in buy.", "/images/undraw_login_wqkt.svg");
      return;
    }
    navigate("/buy-now", { state: { product } });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${temp}/product-related/get-details/${productId}`
        );
        const data = await response.json();
        if (response.ok) {
          setProduct(data);
          setSelectedImage(data.images[0]);
        } else {
          console.error("Error fetching product:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    fetchReviews(productId);
  }, [productId]);

  useEffect(() => {
    const calculateDeliveryDate = () => {
      let today = new Date();
      let deliveryDays = 5;

      let count = 0;
      while (count < deliveryDays) {
        today.setDate(today.getDate() + 1);
        if (today.getDay() !== 0 && today.getDay() !== 6) {
          count++;
        }
      }
      setDeliveryDate(today.toDateString());
    };

    calculateDeliveryDate();
  }, [product]);

  const fetchCartLength = async (userId) => {
    try {
      const response = await fetch(`${temp}/auth/cart/${userId}`);
      const data = await response.json();
      if (response.ok) {
        dispatch(setCartLength(data.cartLength));
      }
    } catch (error) {
      console.error("Error fetching cart length:", error);
    }
  };

  const handleAddToCart = async () => {
    if (!user?._id) {
      showFlash(
        "Please log in to add items to cart.",
        "/images/undraw_login_wqkt.svg"
      );
      return;
    }
    try {
      const response = await fetch(`${temp}/cart-related/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          sareeId: product.sareeId,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0],
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        showFlash(
          "Item successfully added to your cart.",
          "/images/woman-shopping-chart-dark.png"
        );
        fetchCartLength(user._id);
      } else {
        showFlash(
          "Error adding product to cart.",
          "/images/undraw_cancel_7zdh.svg"
        );
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
      showFlash("Failed to add to cart.", "/images/undraw_cancel_7zdh.svg");
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setZoomPosition({ x: 50, y: 50, show: false });
  };

  const [productR, setProductR] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]); // URLs for previews
  const [files, setFiles] = useState([]); // Actual files
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setLightboxOpen(false);
      setIsClosing(false);
    }, 300); // matches your CSS animation duration
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length + files.length > 4) {
      showFlash(
        "You can only upload up to 4 images.",
        "/images/undraw_add-files_d04y.svg"
      );
      return;
    }
    setSelectedImages((prev) => [
      ...prev,
      ...newFiles.map((file) => URL.createObjectURL(file)),
    ]);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmitReview = async () => {
    if (!reviewText || rating === 0) {
      showFlash(
        "Please enter a review and select a rating.",
        "/images/undraw_reviews_ukai.svg"
      );
      return;
    }
    const formData = new FormData();
    formData.append("text", reviewText);
    formData.append("rating", rating);
    files.forEach((file) => {
      formData.append("media", file);
    });
    try {
      const response = await axios.post(
        `${temp}/review-related/products/${productId}/reviews/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setReviewText("");
      setRating(0);
      setFiles([]);
      setSelectedImages([]);
      showFlash(
        "Review submitted successfully!",
        "/images/man-review-stars-dark.png"
      );
    } catch (error) {
      console.error("Error submitting review:", error);
      showFlash("Error submitting review.", "/images/undraw_cancel_7zdh.svg");
    }
  };

  // Fetch Reviews
  const fetchReviews = async (productId) => {
    try {
      const response = await fetch(
        `${temp}/review-related/products/${productId}/reviews`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }
      const reviews = await response.json();
      setProductR(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleDelete = async (index) => {
    console.log(productR[index]._id);
    try {
      await fetch(
        `${temp}/review-related/delete-review/${productId}/${productR[index]._id}`,
        {
          method: "DELETE",
        }
      );
      const updatedReviews = productR.filter((_, i) => i !== index);
      setProductR(updatedReviews);
    } catch (error) {
      console.error("Failed to delete review:", error);
      console.log(error);
    }
  };

  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(0);

  const handleEdit = (index, review) => {
    setEditingIndex(index);
    setEditText(review.text);
    setEditRating(review.rating);
  };

  const handleSave = async (index) => {
    try {
      const reviewToUpdate = productR[index];
      const updatedReview = {
        text: editText,
        rating: editRating,
        images: reviewToUpdate.images || [],
        videos: reviewToUpdate.videos || [],
      };
      const response = await fetch(
        `${temp}/review-related/edit-review/${productId}/${reviewToUpdate._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedReview),
        }
      );

      const data = await response.json();

      const updatedReviews = productR.map((review, i) =>
        i === index ? { ...review, ...data } : review
      );

      setProductR(updatedReviews);
      setEditingIndex(null);
      fetchReviews(productId);
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  };

  // Updated fade logic for lightbox navigation (dissolve effect)
  const handleNextImage = (e) => {
    e.stopPropagation();
    setFadeState("fade-out");
    setTimeout(() => {
      setLightboxIndex((prevIndex) => (prevIndex + 1) % product.images.length);
      setFadeState("fade-in");
    }, 300);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setFadeState("fade-out");
    setTimeout(() => {
      setLightboxIndex(
        (prevIndex) =>
          (prevIndex - 1 + product.images.length) % product.images.length
      );
      setFadeState("fade-in");
    }, 300);
  };

  const handleThumbnailClick = (i) => {
    if (i !== lightboxIndex) {
      setFadeState("fade-out");
      setTimeout(() => {
        setLightboxIndex(i);
        setFadeState("fade-in");
      }, 300);
    }
  };

  const openLightbox = () => {
    const index = product.images.indexOf(selectedImage);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <>
      <Navbar />
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
      {/* Lightbox Gallery */}
      {lightboxOpen && (
        <div
          className={`lightbox-overlay ${isClosing ? "fade-out" : ""}`}
          onClick={handleClose}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button (top-right corner) */}
            <button className="lightbox-close" onClick={handleClose}>
              <CloseIcon sx={{ color: "grey", fontSize: 24 }} />
            </button>

            {/* Main Image with dissolve/fade effect */}
            <img
              className={`lightbox-image ${fadeState}`}
              src={product.images[lightboxIndex]}
              alt="Product Lightbox"
            />

            {/* Navigation Arrows positioned in the blank space */}
            {product.images.length > 1 && (
              <>
                <button className="lightbox-prev" onClick={handlePrevImage}>
                  <ArrowBackIosNewIcon sx={{ color: "grey", fontSize: 24 }} />
                </button>
                <button className="lightbox-next" onClick={handleNextImage}>
                  <ArrowForwardIosIcon sx={{ color: "grey", fontSize: 24 }} />
                </button>
              </>
            )}

            {/* Footer: Title + Thumbnails */}
            <div className="lightbox-footer">
              <h2 className="lightbox-title">{product.name}</h2>
              <div className="lightbox-thumbnails">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    className={`lightbox-thumbnail ${
                      i === lightboxIndex ? "active" : ""
                    }`}
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    onClick={() => handleThumbnailClick(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="product-container">
        <div className="upper-making-center">
          <div className="upper-container">
            {/* Thumbnails */}
            <div className="images-products">
              <div className="thumbnails">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className={`thumbnail ${
                      selectedImage === img ? "selected" : ""
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
              {/* Main Image with Zoom Effect */}
              <div className="main-image-container" onClick={openLightbox}>
                <div
                  className="zoom-image"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    backgroundImage: `url(${selectedImage})`,
                    backgroundPosition: zoomPosition.show
                      ? `${zoomPosition.x}% ${zoomPosition.y}%`
                      : "top",
                    backgroundSize: zoomPosition.show ? "150%" : "100%",
                  }}
                ></div>
              </div>
            </div>
            <div className="product-disc">
              <div className="product-details-container">
                <h2 className="product-desc-h2">{product.name}</h2>
                <p style={{ fontSize: "13px", marginBottom: "5px" }}>
                  Style No {product.sareeId}
                </p>
                {/* <p className="productdetails-price">₹ X,XXX</p> */}
                {/* <p style={{ fontSize: "12px", color: "grey" }}>
                  Inclusive of all taxes
                </p> */}
                <p className="delivery-date">
                  Est Delivery by : {deliveryDate}
                </p>
                <hr />
                <button className="add-to-cart" onClick={handleAddToCart}>
                  ADD TO CART
                </button>
                <button className="buy-now" onClick={handleBuyNow}>
                  BUY NOW
                </button>
                {/* Product Description */}
                <div>
                  <h3 style={{ fontSize: "15px" }}>Description</h3>
                  <div className="details-container">
                    <div className="details-column">
                      <p className="product-desc-p">
                        <strong>Category :</strong>
                        <br /> {product.category}
                      </p>
                      <p className="product-desc-p">
                        <strong>Color :</strong>
                        <br /> {product.color}
                      </p>
                      <p className="product-desc-p">
                        <strong>Work :</strong>
                        <br /> {product.workType}
                      </p>
                    </div>
                    <div className="details-column">
                      <p className="product-desc-p">
                        <strong>Design No :</strong>
                        <br /> {product.sareeId}
                      </p>
                      <p className="product-desc-p">
                        <strong>Fabric :</strong>
                        <br /> {product.fabric}
                      </p>
                      <p className="product-desc-p">
                        <strong>Pack Contains :</strong>
                        <br /> 1 saree and 1 unstitched blouse fabric
                      </p>
                    </div>
                  </div>
                  <p className="product-desc-p mb-3">
                    <strong>Product Speciality :</strong> <br />{" "}
                    {product.description}
                  </p>
                  <p className="product-desc-p mb-3">
                    <strong>Care Instructions :</strong> <br /> Dry clean only.
                  </p>
                  <p className="product-desc-p mb-3">
                    <strong>Disclaimer :</strong> <br /> The actual color,
                    texture, or pattern may slightly vary due to the artisan-led
                    techniques used and device screen settings
                  </p>
                </div>
                <hr />

                <Box
                  component="ul"
                  sx={{
                    listStyleType: "disc", // use browser bullet points
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)", // 2 columns
                    justifyItems: "start",
                    alignItems: "start",
                    pl: 2,
                    m: 0,
                  }}
                >
                  {items.map((item, index) => (
                    <Box
                      component="li"
                      key={index}
                      sx={{
                        fontSize: "12px",
                        fontWeight: 500,
                        margin: "10px",
                      }}
                    >
                      {item}
                    </Box>
                  ))}
                </Box>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewProducts type="similar" productId={product._id} />

      <div className="product-reviews">
        <h3 className="title">Customer Reviews</h3>
        <div className="review-form">
          <textarea
            placeholder="Write your review..."
            className="review-input"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            style={{ border: "1px solid grey" }}
          ></textarea>
          {/* Star Rating */}
          <div className="star-rating">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`star${index < rating ? " filled" : ""}`}
                onClick={() => setRating(index + 1)}
              >
                ★
              </span>
            ))}
          </div>
          {/* File Upload Section */}
          <div className="upload-section">
            <input
              type="file"
              className="review-upload"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              disabled={selectedImages.length >= 4}
              style={{ fontSize: "12px" }}
            />
            <div className="image-preview-container">
              {selectedImages.map((img, index) => (
                <div key={index} className="image-preview">
                  <img
                    src={img}
                    alt={`Preview${index}`}
                    className="preview-image"
                  />
                  <button
                    className="remove-image"
                    onClick={() => removeImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button className="submit-review" onClick={handleSubmitReview}>
            Submit Review
          </button>
        </div>
        {/* Reviews List */}
        <div className="yash-review-list">
          {productR.map((review, index) => {
            const reviewNumber = index + 1;
            const stars =
              reviewNumber <= 5
                ? "★".repeat(reviewNumber)
                : `Review ${reviewNumber}`;

            // console.log(review.user);
            // console.log(userId);

            return (
              <div key={index} className="yash-review">
                {/* Left Side: User Name & Review Number / Stars */}
                <div className="yash-review-left">
                  <p>
                    <i>{review.text}</i>
                  </p>
                  <p className="mb-2">
                    <strong style={{ marginRight: "8px" }}>
                      {review.userName}
                    </strong>{" "}
                    {stars}
                  </p>
                  <div className="yash-review-media">
                    {review.images?.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Review ${i}`}
                        className="yash-review-image"
                      />
                    ))}
                  </div>
                </div>

                {/* Right Side: Edit & Delete Buttons */}
                <div className="yash-review-right">
                  {editingIndex === index ? (
                    <div className="yash-review-edit-form">
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="yash-review-textarea"
                        />

                        {/* Star Slider Input */}

                        <div className="yash-review-rating-slider">
                          <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            value={editRating}
                            onChange={(e) => setEditRating(e.target.value)}
                            className="yash-review-star-slider"
                          />
                          <div className="stars">
                            {"★".repeat(editRating) +
                              "☆".repeat(5 - editRating)}
                          </div>
                        </div>
                      </div>

                      <div className="yash-review-button-group">
                        <button
                          onClick={() => handleSave(index)}
                          className="yash-review-button"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="yash-review-button"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    review.user === userId && (
                      <div className="yash-review-button-group">
                        <button
                          onClick={() => handleEdit(index, review)}
                          className="yash-review-button"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="yash-review-button yash-review-delete-button"
                        >
                          Delete
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
