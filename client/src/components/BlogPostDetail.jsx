import { Facebook, Twitter, Instagram } from "lucide-react";
import "../styles/BlogPostDetail.css";
import Navbar from "../includes/Navbar";
import Footer from "../includes/Footer";

// Mock data for a single blog post
const blogPost = {
  id: 1,
  title: "Summer Fashion Trends 2025: Embracing Sustainable Style",
  category: "Fashion",
  date: "June 15, 2025",
  author: {
    name: "Emma Style",
    avatar:
      "https://th.bing.com/th/id/OIP.O0XyzlsgjaxzQmSZj7II2gHaFj?rs=1&pid=ImgDetMain",
    bio: "Fashion enthusiast and sustainability advocate",
  },
  heroImage:
    "https://assets.vogue.in/photos/5ce41bf11dc2676095c774db/16:9/w_1280,c_limit/Anita-Dongres-Pichhwai-Collection.jpg",
  content: `
    <p>As we approach the summer of 2025, the fashion world is buzzing with excitement over the latest trends that not only look fabulous but also champion sustainability. This season, we're seeing a beautiful fusion of eco-conscious materials, innovative designs, and a return to timeless styles that promote longevity in our wardrobes.</p>

    <h2>1. Biodegradable Fabrics Take Center Stage</h2>
    <p>Leading designers are embracing fabrics that decompose naturally, reducing the fashion industry's environmental footprint. Expect to see stunning pieces made from materials like organic cotton, Tencel, and even fabrics derived from fruit waste. These biodegradable options not only feel great on the skin but also alleviate concerns about long-term environmental impact.</p>

    <h2>2. Upcycled Chic: From Waste to Wardrobe</h2>
    <p>Upcycling has evolved from a niche trend to a mainstream fashion statement. Innovative brands are transforming discarded materials into high-fashion items. From jackets made of repurposed parachutes to elegant dresses crafted from vintage curtains, upcycled fashion is proving that one person's trash can indeed be another's treasure – and a stylish one at that!</p>

    <h2>3. Tech-Infused Sustainable Wear</h2>
    <p>The marriage of technology and sustainable fashion is giving birth to exciting new possibilities. Smart fabrics that adapt to temperature changes, reducing the need for multiple layers, are becoming increasingly popular. Additionally, we're seeing the rise of 3D-printed accessories made from recycled plastics, offering unique, customizable designs with minimal waste.</p>

    <h2>4. Timeless Minimalism: Quality Over Quantity</h2>
    <p>In a shift away from fast fashion, consumers are gravitating towards high-quality, timeless pieces that transcend seasonal trends. This summer, expect to see a lot of clean lines, neutral color palettes, and versatile pieces that can be mixed and matched for various occasions. The focus is on building a sustainable wardrobe that lasts for years, not just a season.</p>

    <p>As we embrace these sustainable fashion trends, we're not just making style statements – we're taking steps towards a more eco-friendly future. The summer of 2025 is set to prove that fashion can be both beautiful and responsible. So, as you update your wardrobe this season, remember that every sustainable choice you make contributes to a greener, more stylish world.</p>
  `,
  tags: [
    "Sustainable Fashion",
    "Summer Trends",
    "Eco-Friendly",
    "Upcycling",
    "Minimalism",
  ],
  relatedPosts: [
    {
      id: 2,
      title: "10 Must-Have Eco-Friendly Accessories for Summer",
      image:
        "https://th.bing.com/th/id/R.c19d879cd1482e7efd496a14cc3273a2?rik=DHmYFMrkXq7qvQ&riu=http%3a%2f%2fwww.koskii.com%2fcdn%2fshop%2fproducts%2fkoskii-sea-green-stonework-satin-designer-saree-saus0022632_sea_green__1.jpg%3fv%3d1670485220&ehk=Hkig7iWqkVfwtyPWVdW3RB%2fuaQ1Vkp6%2f4ibOu5XI4ig%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      id: 3,
      title: "How to Build a Sustainable Capsule Wardrobe",
      image:
        "https://th.bing.com/th/id/R.c19d879cd1482e7efd496a14cc3273a2?rik=DHmYFMrkXq7qvQ&riu=http%3a%2f%2fwww.koskii.com%2fcdn%2fshop%2fproducts%2fkoskii-sea-green-stonework-satin-designer-saree-saus0022632_sea_green__1.jpg%3fv%3d1670485220&ehk=Hkig7iWqkVfwtyPWVdW3RB%2fuaQ1Vkp6%2f4ibOu5XI4ig%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      id: 4,
      title: "The Rise of Rental Fashion: Is It Really Sustainable?",
      image:
        "https://th.bing.com/th/id/R.c19d879cd1482e7efd496a14cc3273a2?rik=DHmYFMrkXq7qvQ&riu=http%3a%2f%2fwww.koskii.com%2fcdn%2fshop%2fproducts%2fkoskii-sea-green-stonework-satin-designer-saree-saus0022632_sea_green__1.jpg%3fv%3d1670485220&ehk=Hkig7iWqkVfwtyPWVdW3RB%2fuaQ1Vkp6%2f4ibOu5XI4ig%3d&risl=&pid=ImgRaw&r=0",
    },
  ],
};

const BlogPostDetail = () => {
  return (
    <div className="main-mohit-BlogPostDetail">
      <Navbar />
      <div className="blog-post-detail-mohit">
        <div
          className="hero-image-mohit-BlogPostDetail"
          style={{ backgroundImage: `url(${blogPost.heroImage})` }}
        >
          <div className="hero-content-mohit-BlogPostDetail">
            <h1>{blogPost.title}</h1>
            <div className="post-meta-mohit">
              <span className="category-mohit">{blogPost.category}</span>
              <span className="date-mohit">{blogPost.date}</span>
            </div>
          </div>
        </div>

        <div className="post-content-wrapper-mohit">
          <aside className="author-info-mohit">
            <img
              src={blogPost.author.avatar || "/placeholder.svg"}
              alt={blogPost.author.name}
              className="author-avatar-mohit"
            />
            <h3>{blogPost.author.name}</h3>
            <p>{blogPost.author.bio}</p>
            <div className="social-share-mohit">
              <Facebook size={20} />
              <Twitter size={20} />
              <Instagram size={20} />
            </div>
          </aside>

          <article className="post-content-mohit">
            <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />

            <div className="tags-mohit">
              {blogPost.tags.map((tag) => (
                <span key={tag} className="tag-mohit">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        </div>

        <section className="read-next-mohit">
          <h2>Read Next</h2>
          <div className="related-posts-mohit">
            {blogPost.relatedPosts.map((post) => (
              <div key={post.id} className="related-post-mohit">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  style={{ objectPosition: "top" }}
                />
                <h3>{post.title}</h3>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPostDetail;
