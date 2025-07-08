import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { logout, setCartLength, updateWishlistCount } from "../redux/state";

const Navbar = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchInputRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { user, cartLength, wishListLength } = useSelector(
    (state) => state.user
  );

  const getFirstName = (fullName) => {
    if (!fullName) return "";
    return fullName.trim().split(" ")[0]; // Split by space and return first word
  };

  useEffect(() => {
    const typed = new Typed(searchInputRef.current, {
      strings: [
        "Search for silk sarees",
        "Search for cotton sarees",
        "Search for linen sarees",
      ],
      typeSpeed: 60,
      backSpeed: 60,
      loop: true,
      attr: "placeholder",
      smartBackspace: true,
    });

    return () => typed.destroy();
  }, []);

  const sareeSuggestions = [
    "Banarasi",
    "Kanjeevaram",
    "Chanderi",
    "Tussar",
    "Georgette",
    "Cotton",
    "Silk",
    "Organza",
    "Patola",
    "Paithani",
    "Linen",
    "Net",
    "Crepe",
    "Pure Silk",
    "Cotton Silk",
    "Khadi",
    "Chiffon",
    "Velvet",
    "Satin",
    "Muslin",
    "Art Silk",
    "Handloom",
    "Synthetic",
    "Zari Work",
    "Embroidered",
    "Printed",
    "Hand-painted",
    "Thread Work",
    "Mirror Work",
    "Block Print",
    "Tie & Dye",
    "Bandhani",
    "Katha Stitch",
    "Wedding",
    "Party Wear",
    "Office Wear",
    "Casual",
    "Festival",
    "Traditional",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Pink",
    "Black",
    "White",
    "Purple",
    "Gold",
    "Silver",
  ];

  const [suggestions, setSuggestions] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = sareeSuggestions.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filteredSuggestions.slice(0, 6));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    navigateToSearch(searchValue);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion);
    setSuggestions([]);
    navigateToSearch(suggestion);
  };

  const navigateToSearch = (query) => {
    const encodedSearch = query.trim().replace(/\s+/g, "+");
    navigate(`/product-listing?search=${encodedSearch}`);
  };

  const fetchCartLength = async (dispatch, userId) => {
    try {
      const response = await fetch(`${URL}/auth/cart/${userId}`);
      const data = await response.json();

      console.log(data);
      if (response.ok) {
        dispatch(setCartLength(data.cartLength));
      }
    } catch (error) {
      console.error("Error fetching cart length:", error);
    }
  };

  const fetchWishListLength = async (dispatch, userId) => {
    try {
      const response = await fetch(`${URL}/auth/wishlist/${userId}`);
      const data = await response.json();
      if (response.ok) {
        dispatch(updateWishlistCount(data));
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching cart length:", error);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchCartLength(dispatch, user._id);
      fetchWishListLength(dispatch, user._id);
    }
  }, [user, dispatch]);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg border-bottom bg-white sticky-top mt-2 px-3">
        <div className="container-fluid px-0 custom-navbar-width">
          {/* Logo */}

          <a className="navbar-brand d-flex" href="/">
            {/* <img
              src="/images/rangoli_5515924.png"
              alt=""
              style={{
                width: "2rem",
                height: "2rem",
                marginBottom: "5px",
                marginRight: "5px",
              }}
            /> */}
            <h2 style={{ marginTop: "5px" }}>KASHVI</h2>
          </a>

          {/* Desktop Menu */}
          <div className="collapse navbar-collapse  d-lg-flex">
            <ul className="navbar-nav me-auto px-3">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  href="/product-listing?category=Silk"
                >
                  Silk
                </a>
              </li>
              <li className="nav-item ms-4">
                <a
                  className="nav-link active"
                  href="/product-listing?category=Cotton"
                >
                  Cotton
                </a>
              </li>
              <li className="nav-item ms-4">
                <a
                  className="nav-link active"
                  href="/product-listing?category=Chiffon"
                >
                  Chiffon
                </a>
              </li>
              <li className="nav-item ms-4">
                <a
                  className="nav-link active"
                  href="/product-listing?category=Handloom"
                >
                  Handloom
                </a>
              </li>
              <li className="nav-item ms-4">
                <a
                  className="nav-link active"
                  href="/product-listing?category=Banarasi"
                >
                  Banarasi
                </a>
              </li>
              <li className="nav-item ms-4">
                <a className="nav-link active" href="/blogs">
                  Blogs
                </a>
              </li>
              <li className="nav-item ms-4">
                <a className="nav-link active" href="/about-us">
                  About us
                </a>
              </li>
            </ul>
          </div>

          {/* Search Bar */}
          <div className="suggestion-form-list">
            <form
              className="d-flex px-4 mx-auto"
              role="search"
              onSubmit={handleSearchSubmit}
            >
              <input
                ref={searchInputRef}
                className="form-control form-control-sm input-custom rounded-start"
                type="search"
                name="search"
                placeholder="Search"
                aria-label="Search"
                value={searchValue}
                onChange={handleSearchChange}
                style={{
                  backgroundColor: "rgb(243, 243, 243)",
                  fontSize: "0.775rem",
                  height: "35px",
                  width: "200px",
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "0",
                  textAlign: "center",
                }}
              />
              <button
                className="btn btn-sm btn-dark rounded-end rounded-0"
                type="submit"
              >
                <SearchIcon fontSize="small" />
              </button>
            </form>
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Icons Section (Right-Aligned) */}
          <div className="d-flex align-items-center justify-content-center">
            <Link to="https://api.whatsapp.com/send?phone=+919376421333&text=Hello%20to%20Kashvi%20Sarees">
              <WhatsAppIcon
                className="me-3 nav-icons"
                fontSize="medium"
                style={{ color: "#000" }}
              />
            </Link>

            <div className="cart-item-badge-navbar">
              <Link to={user && user._id ? "/wishlist" : "/login"}>
                <FavoriteBorderOutlinedIcon
                  className="me-3 nav-icons"
                  fontSize="medium"
                  style={{ color: "#222222" }}
                />
              </Link>
              {wishListLength >= 0 && (
                <span className="cart-badge-navbar-cart">{wishListLength}</span>
              )}
            </div>

            <div className="cart-item-badge-navbar">
              <Link to={user && user._id ? "/cart" : "/login"}>
                <ShoppingBagOutlinedIcon
                  className="me-3 nav-icons"
                  fontSize="medium"
                  style={{ color: "#222222" }}
                />
                {cartLength >= 0 && (
                  <span className="cart-badge-navbar-cart">{cartLength}</span>
                )}
              </Link>
            </div>

            {/* Account Icon or First Letter */}
            <div
              className="account-menu-container"
              // onMouseEnter={() => setAccountMenuOpen((prev) => !prev)}
              onClick={() => setAccountMenuOpen((prev) => !prev)}
              style={{ position: "relative", cursor: "pointer" }}
            >
              {user && user._id ? (
                <div className="user-initial-circle">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              ) : (
                <AccountCircleOutlinedIcon
                  className="nav-icons"
                  fontSize="medium"
                />
              )}
              {accountMenuOpen && (
                <div className="account-dropdown">
                  {user && user._id ? (
                    <>
                      <p>Welcome {getFirstName(user.name)}!</p>
                      {user.role === "admin" ? (
                        <Link to="/dashboard" className="account-dropdown-item">
                          Admin Dashboard
                        </Link>
                      ) : (
                        ""
                      )}

                      <Link to="/orders" className="account-dropdown-item">
                        My Orders
                      </Link>
                      <a
                        role="button"
                        className="account-dropdown-item"
                        onClick={() => dispatch(logout())}
                      >
                        Logout
                      </a>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="account-dropdown-item">
                        Login
                      </Link>
                      <Link to="/signup" className="account-dropdown-item">
                        Signup
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar Toggle Button (Hidden on Desktop) */}
            <button
              className="btn d-lg-none"
              onClick={() => setSidebarOpen(true)}
            >
              <MenuIcon fontSize="medium" />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar (Mobile Navigation) */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button
          className="sidebar-close-btn"
          onClick={() => setSidebarOpen(false)}
        >
          <CloseIcon fontSize="small" />
        </button>
        <ul className="sidebar-menu">
          <li>
            <a href="/product-listing?category=Silk">Silk</a>
          </li>
          <li>
            <a href="/product-listing?category=Cotton">Cotton</a>
          </li>
          <li>
            <a href="/product-listing?category=Chiffon">Chiffon</a>
          </li>
          <li>
            <a href="/product-listing?category=Handloom">Handloom</a>
          </li>
          <li>
            <a href="/product-listing?category=Banarasi">Banarasi</a>
          </li>
          <li>
            <a href="/blogs">Blogs</a>
          </li>
          <li>
            <a href="/about-us">About us</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
