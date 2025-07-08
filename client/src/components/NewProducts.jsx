import { useEffect, useState } from "react";
import "../styles/newproducts.css"; // Import custom CSS
import { Link } from "react-router-dom";

const NewProducts = ({ type, productId }) => {
  const temp = import.meta.env.VITE_BACKEND_URL;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "";
        if (type === "latest") {
          url = `${temp}/product-related/products/latest`;
        } else if (type === "similar" && productId) {
          url = `${temp}/product-related/similar/${productId}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [type, productId]);

  return (
    <div className="container">
      <h2
        className="text-center"
        style={{
          fontSize: "1.25rem",
          fontWeight: "400",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {type === "latest" ? "New Arrivals" : "Similar Products"}
      </h2>

      <div className="product-grid">
        {products.map((product, index) => (
          <>
            <Link to={`/product-details/${product._id}`}>
              <div key={index} className="product-card">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="new-product-img"
                />
                <p
                  className="wishlist-item-name text-start"
                  style={{ fontSize: "16px", fontWeight: "500" }}
                >
                  {product.name}
                </p>
                <p
                  className="wishlist-item-price text-start"
                  style={{ marginTop: "0" }}
                >
                  {/* MRP <span className="price">₹ X,XXX</span> */}
                </p>
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
