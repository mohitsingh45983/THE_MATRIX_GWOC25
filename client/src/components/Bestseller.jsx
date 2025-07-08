import { Link } from "react-router-dom";
import "../styles/newproducts.css"; // Import custom CSS
import { useEffect, useState } from "react";

const Bestseller = ({ bestSelling }) => {
  const [products, setProducts] = useState([]);
  const temp = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBestSelling = async () => {
      try {
        const response = await fetch(
          `${temp}/product-related/products/best-seller`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error("error ");
        }

        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBestSelling();
  }, [bestSelling]);

  return (
    <div className="container mb-5">
      <h2
        className="text-center"
        style={{
          fontSize: "1.25rem",
          fontWeight: "400",
          marginTop: "0",
          marginBottom: "30px",
        }}
      >
        Bestseller Elegance
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
                {/* Product Name & Price */}
                <p
                  className="wishlist-item-name"
                  style={{ fontSize: "16px", fontWeight: "500" }}
                >
                  {product.name}
                </p>
                <p className="wishlist-item-price " style={{ marginTop: "0" }}>
                  {/* MRP <span className="price">X,XXX</span> */}
                </p>
              </div>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
};

export default Bestseller;
