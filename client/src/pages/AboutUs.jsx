import "../styles/aboutus.css"; // Import the updated CSS file
import Navbar from "../includes/Navbar";
import Footer from "../includes/Footer";
import StoreLocation from "../components/StoreLocation";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        {/* Page Title */}
        <h1 className="page-title">Learn More About Our Journey & Vision</h1>

        {/* Video Section */}
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="Company Story Video"
            allowFullScreen
          ></iframe>
        </div>

        {/* Company Info */}
        <div className="company-info">
          <h2 className="company-name">KASHVI</h2>
          <p className="company-description text-start">
            KASHVI, born in Surat, Gujarat, is a premium saree brand celebrating
            India's rich textile heritage. Blending tradition with modern
            aesthetics, we offer exquisite sarees—from luxurious silks to
            lightweight daily wear and festive drapes. Each piece embodies
            craftsmanship, elegance, and cultural essence, ensuring grace and
            sophistication for every occasion.
          </p>
        </div>

        {/* Vision & Mission Section */}
        <div className="vision">
          <h2 className="company-name">Vision</h2>
          <p className="company-description text-start">
            KASHVI envisions becoming a globally recognized name in ethnic
            fashion, redefining sarees as a blend of tradition, confidence, and
            individuality. Rooted in Surat’s rich textile legacy, we strive to
            preserve heritage craftsmanship while embracing modern aesthetics.
            With ethical sourcing and sustainable practices, we aim to set new
            benchmarks in the saree industry, making Indian ethnic fashion a
            global style statement.
          </p>
        </div>

        <div className="mission">
          <h2 className="company-name">Mission</h2>
          <p className="company-description text-start">
            KASHVI's mission is to uphold India's textile legacy by offering
            exquisitely crafted sarees that blend tradition with contemporary
            elegance. We innovate while preserving cultural heritage, ensuring
            each saree reflects timeless beauty and craftsmanship. Committed to
            ethical sourcing and sustainability, we empower artisans with fair
            wages and eco-friendly practices. With a customer-centric approach,
            we strive to make KASHVI a global symbol of grace, confidence, and
            enduring ethnic fashion.
          </p>
        </div>

        {/* Features Section */}
        <h2 className="company-name mt-5">Features</h2>
        <div className="features">
          <div className="feature-item">
            <img
              src="https://static3.azafashions.com/uploads/product_gallery/n-k310022-0043096001650719212.JPG"
              alt="Customization"
              className="feature-icon"
            />
            <h3 className="company-name">Customization</h3>
            <p className="company-description text-start">
              Our clients experience personal attention and service from
              professional fashion consultants who help select and style each
              outfit. We tailor designs of your choice through immaculate
              tailoring because your KASHVI experience is our priority.
            </p>
          </div>
          <div className="feature-item">
            <img
              src="https://th.bing.com/th/id/R.c19d879cd1482e7efd496a14cc3273a2?rik=DHmYFMrkXq7qvQ&riu=http%3a%2f%2fwww.koskii.com%2fcdn%2fshop%2fproducts%2fkoskii-sea-green-stonework-satin-designer-saree-saus0022632_sea_green__1.jpg%3fv%3d1670485220&ehk=Hkig7iWqkVfwtyPWVdW3RB%2fuaQ1Vkp6%2f4ibOu5XI4ig%3d&risl=&pid=ImgRaw&r=0"
              alt="Collection Launches"
              className="feature-icon"
            />
            <h3 className="company-name">Collection Launches</h3>
            <p className="company-description text-start">
              Here at KASHVI, we make sure that all our designs are latest &
              thereby we bring to you collections that we launch before every
              season across our stores & online.
            </p>
          </div>
          <div className="feature-item">
            <img
              src="https://www.koskii.com/cdn/shop/files/koskii-purple-stonework-semicrepe-designer-saree-saus0034824_purple_1_1_1400x.jpg?v=1719829414"
              alt="Worldwide Shipping"
              className="feature-icon"
            />
            <h3 className="company-name">Worldwide Shipping</h3>
            <p className="company-description text-start">
              We offer free shipping on orders above USD $200 across 24
              countries. KASHVI guarantees 100% authenticity of all items with
              premium logistics partners (DHL, UPS, Blue Dart, Delhivery).
            </p>
          </div>
        </div>
      </div>
      <div className="mb-5">
        <StoreLocation />
      </div>

      <Footer />
    </>
  );
};

export default AboutUs;
