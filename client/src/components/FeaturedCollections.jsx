import { Link } from "react-router-dom";
import "../styles/featuredcollections.css"; // Import custom CSS

const collections = [
  {
    img: "https://www.koskii.com/cdn/shop/products/koskii-peach-threadwork-semi-crepe-designer-saree-saus0022636_peach__4_1400x.jpg?v=1670488483",
    title: "Midnight Soirée",
    link: "/product-listing?occasion=Party",
  },

  {
    img: "https://www.koskii.com/cdn/shop/files/koskii-purple-stonework-semicrepe-designer-saree-saus0034824_purple_1_1_1400x.jpg?v=1719829414",
    title: "Eternal Vows",
    link: "/product-listing?occasion=Wedding",
  },
  {
    img: "https://www.koskii.com/cdn/shop/products/koskii-lavender-mirrorwork-net-designer-saree-saus0021303_lavender_3_1800x1800.jpg?v=1661854696",
    title: "Festive Radiance",
    link: "/product-listing?occasion=Festive",
  },
  {
    img: "https://www.koskii.com/cdn/shop/products/koskii-red-stonework-satin-designer-saree-saus0022634_red__2_1400x.jpg?v=1670491333",

    title: "Bridal Euphoria",
    link: "/product-listing?occasion=Bridal",
  },
];

const FeaturedCollections = () => {
  return (
    <div className="collection-container mb-4">
      <h2
        className="text-center"
        style={{
          fontSize: "1.25rem",
          fontWeight: "400",
          marginTop: "30px",
          marginBottom: "50px",
        }}
      >
        Featured Collections
      </h2>

      <div className="collection-grid">
        {collections.map((collection, index) => (
          <div
            key={index}
            className="collection-card collection-image-container"
          >
            <Link to={collection.link}>
              <img
                src={collection.img}
                alt={collection.title}
                className="collection-img"
              />
              <div className="collection-title">{collection.title}</div>
              <button className="shop-now-btn">SHOP NOW</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCollections;
