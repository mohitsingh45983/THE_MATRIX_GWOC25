import { useState } from "react";
import {
  Search,
  ChevronDown,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import "../styles/BlogPage.css";
import { Link } from "react-router-dom";
import Navbar from "../includes/Navbar";
import Footer from "../includes/Footer";

const temp = import.meta.env.VITE_BACKEND_URL;

const blogPosts = [
  {
    id: 1,
    title: "Summer Fashion Trends 2025",
    category: "Fashion",
    image:
      "https://th.bing.com/th/id/R.c19d879cd1482e7efd496a14cc3273a2?rik=DHmYFMrkXq7qvQ&riu=http%3a%2f%2fwww.koskii.com%2fcdn%2fshop%2fproducts%2fkoskii-sea-green-stonework-satin-designer-saree-saus0022632_sea_green__1.jpg%3fv%3d1670485220&ehk=Hkig7iWqkVfwtyPWVdW3RB%2fuaQ1Vkp6%2f4ibOu5XI4ig%3d&risl=&pid=ImgRaw&r=0",
    excerpt: "Discover the hottest styles for the upcoming summer season...",
  },
  {
    id: 2,
    title: "Sustainable Fabrics Highlight ",
    category: "Sustainability",
    image:
      "https://th.bing.com/th/id/R.c19d879cd1482e7efd496a14cc3273a2?rik=DHmYFMrkXq7qvQ&riu=http%3a%2f%2fwww.koskii.com%2fcdn%2fshop%2fproducts%2fkoskii-sea-green-stonework-satin-designer-saree-saus0022632_sea_green__1.jpg%3fv%3d1670485220&ehk=Hkig7iWqkVfwtyPWVdW3RB%2fuaQ1Vkp6%2f4ibOu5XI4ig%3d&risl=&pid=ImgRaw&r=0",
    excerpt: "How eco-friendly materials are changing the fashion industry...",
  },
  {
    id: 3,
    title: "Accessorizing 101",
    category: "Style Tips",
    image:
      "https://th.bing.com/th/id/R.c19d879cd1482e7efd496a14cc3273a2?rik=DHmYFMrkXq7qvQ&riu=http%3a%2f%2fwww.koskii.com%2fcdn%2fshop%2fproducts%2fkoskii-sea-green-stonework-satin-designer-saree-saus0022632_sea_green__1.jpg%3fv%3d1670485220&ehk=Hkig7iWqkVfwtyPWVdW3RB%2fuaQ1Vkp6%2f4ibOu5XI4ig%3d&risl=&pid=ImgRaw&r=0",
    excerpt:
      "Master the art of selecting the perfect accessories for any outfit...",
  },
  {
    id: 4,
    title: "Vintage Fashion Comeback",
    category: "Trends",
    image:
      "https://th.bing.com/th/id/R.c19d879cd1482e7efd496a14cc3273a2?rik=DHmYFMrkXq7qvQ&riu=http%3a%2f%2fwww.koskii.com%2fcdn%2fshop%2fproducts%2fkoskii-sea-green-stonework-satin-designer-saree-saus0022632_sea_green__1.jpg%3fv%3d1670485220&ehk=Hkig7iWqkVfwtyPWVdW3RB%2fuaQ1Vkp6%2f4ibOu5XI4ig%3d&risl=&pid=ImgRaw&r=0",
    excerpt: "Why retro styles are making a big return in 2025...",
  },
  {
    id: 5,
    title: "Minimalist Wardrobe Guide",
    category: "Style Tips",
    image:
      "https://th.bing.com/th/id/R.c19d879cd1482e7efd496a14cc3273a2?rik=DHmYFMrkXq7qvQ&riu=http%3a%2f%2fwww.koskii.com%2fcdn%2fshop%2fproducts%2fkoskii-sea-green-stonework-satin-designer-saree-saus0022632_sea_green__1.jpg%3fv%3d1670485220&ehk=Hkig7iWqkVfwtyPWVdW3RB%2fuaQ1Vkp6%2f4ibOu5XI4ig%3d&risl=&pid=ImgRaw&r=0",
    excerpt:
      "Simplify your closet and elevate your style with these essentials...",
  },
  {
    id: 6,
    title: "Fashion Week Highlights",
    category: "Events",
    image:
      "https://th.bing.com/th/id/R.c19d879cd1482e7efd496a14cc3273a2?rik=DHmYFMrkXq7qvQ&riu=http%3a%2f%2fwww.koskii.com%2fcdn%2fshop%2fproducts%2fkoskii-sea-green-stonework-satin-designer-saree-saus0022632_sea_green__1.jpg%3fv%3d1670485220&ehk=Hkig7iWqkVfwtyPWVdW3RB%2fuaQ1Vkp6%2f4ibOu5XI4ig%3d&risl=&pid=ImgRaw&r=0",
    excerpt:
      "Recap of the most stunning moments from this year's Fashion Week...",
  },

  {
    id: 7,
    title: "Fashion Week Highlights",
    category: "Events",
    image:
      "https://th.bing.com/th/id/R.c19d879cd1482e7efd496a14cc3273a2?rik=DHmYFMrkXq7qvQ&riu=http%3a%2f%2fwww.koskii.com%2fcdn%2fshop%2fproducts%2fkoskii-sea-green-stonework-satin-designer-saree-saus0022632_sea_green__1.jpg%3fv%3d1670485220&ehk=Hkig7iWqkVfwtyPWVdW3RB%2fuaQ1Vkp6%2f4ibOu5XI4ig%3d&risl=&pid=ImgRaw&r=0",
    excerpt:
      "Recap of the most stunning moments from this year's Fashion Week...",
  },

  {
    id: 8,
    title: "Fashion Week Highlights",
    category: "Events",
    image:
      "https://th.bing.com/th/id/R.c19d879cd1482e7efd496a14cc3273a2?rik=DHmYFMrkXq7qvQ&riu=http%3a%2f%2fwww.koskii.com%2fcdn%2fshop%2fproducts%2fkoskii-sea-green-stonework-satin-designer-saree-saus0022632_sea_green__1.jpg%3fv%3d1670485220&ehk=Hkig7iWqkVfwtyPWVdW3RB%2fuaQ1Vkp6%2f4ibOu5XI4ig%3d&risl=&pid=ImgRaw&r=0",
    excerpt:
      "Recap of the most stunning moments from this year's Fashion Week...",
  },

  {
    id: 9,
    title: "Fashion Week Highlights",
    category: "Events",
    image:
      "https://th.bing.com/th/id/R.c19d879cd1482e7efd496a14cc3273a2?rik=DHmYFMrkXq7qvQ&riu=http%3a%2f%2fwww.koskii.com%2fcdn%2fshop%2fproducts%2fkoskii-sea-green-stonework-satin-designer-saree-saus0022632_sea_green__1.jpg%3fv%3d1670485220&ehk=Hkig7iWqkVfwtyPWVdW3RB%2fuaQ1Vkp6%2f4ibOu5XI4ig%3d&risl=&pid=ImgRaw&r=0",
    excerpt:
      "Recap of the most stunning moments from this year's Fashion Week...",
  },
];

const categories = [
  "All",
  "Fashion",
  "Sustainability",
  "Style Tips",
  "Trends",
  "Events",
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visiblePosts, setVisiblePosts] = useState(4);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${temp}/auth/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
      setEmail("");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  const filteredPosts = blogPosts.filter(
    (post) =>
      (selectedCategory === "All" || post.category === selectedCategory) &&
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    setVisiblePosts((prevVisible) =>
      Math.min(prevVisible + 4, filteredPosts.length)
    );
  };

  return (
    <>
      <Navbar />

      <div className="enhanced-blog-page">
        <div className="hero-BlogPosts-mohit">
          <img
            src="https://assets.vogue.in/photos/5ce41bf11dc2676095c774db/16:9/w_1280,c_limit/Anita-Dongres-Pichhwai-Collection.jpg"
            alt="Hero Background"
            className="hero-image-BlogPosts-mohit"
            style={{ filter: "brightness(50%)", borderRadius: "0" }}
          />
          <div className="hero-content-BlogPosts-mohit">
            <h3 style={{ color: "white" }}>Fashion & Style Blog</h3>
            <p>
              Discover the latest trends, style tips, and sustainable fashion
              ideas
            </p>
          </div>
        </div>

        <section className="blog-controls-BlogPosts-mohit">
          <div className="search-bar-BlogPosts-mohit">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: "0.85rem" }}
            />
          </div>
          <div className="category-filter-BlogPosts-mohit">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ fontSize: "0.85rem" }}
            >
              {categories.map((category) => (
                <option
                  className="blog-category-option"
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
            <ChevronDown size={20} />
          </div>
        </section>

        <section className="blog-grid-BlogPosts-mohit">
          {filteredPosts.slice(0, visiblePosts).map((post) => (
            <Link to="/blogdetails">
              <article key={post.id} className="blog-card-BlogPosts-mohit">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  style={{ objectPosition: "top" }}
                />
                <div className="blog-card-content-BlogPosts-mohit">
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <div className="blog-card-footer-BlogPosts-mohit">
                    <span className="category-BlogPosts-mohit">
                      {post.category}
                    </span>
                    <div className="social-share-BlogPosts-mohit">
                      <Facebook size={16} />
                      <Twitter size={16} />
                      <Instagram size={16} />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </section>

        {visiblePosts < filteredPosts.length && (
          <button
            className="load-more-BlogPosts-mohit"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        )}

        <section className="newsletter-BlogPosts-mohit">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Stay updated with the latest fashion trends and style tips</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Subscribe</button>
          </form>
          <br />
          {message && <p>{message}</p>}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default BlogPage;
