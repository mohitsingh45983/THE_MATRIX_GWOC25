import { useState, useEffect } from "react";
import "../styles/filter.css";
import FilterDropdowns from "./FilterDropdowns";
import ProductCardFilter from "./ProductCardFilter";
import Pagination from "./Pagination";
import ExploreMore from "./ExploreMore";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Filter = () => {
  const temp = import.meta.env.VITE_BACKEND_URL;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [openFilters, setOpenFilters] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedFabric, setSelectedFabric] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedOccasion, setSelectedOccasion] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const user = useSelector((state) => state.user?.user);
  const userId = user?._id;

  const filters = [
    // "Price",
    "Categories",
    "Color",
    "Fabric",
    "Work",
    "Occasion",
  ];

  const Categories = [
    { name: "Banarasi", count: 25 },
    { name: "Chiffon", count: 93 },
    { name: "Cotton", count: 136 },
    { name: "Silk", count: 59 },
    { name: "Handloom", count: 193 },
    { name: "Kanjeevaram", count: 15 },
  ];

  const fabrics = [
    { name: "Cotton", count: 5 },
    { name: "Georgette", count: 135 },
    { name: "Chiffon", count: 7 },
    { name: "Net", count: 41 },
    { name: "Silk", count: 155 },
  ];

  const occasions = [
    { name: "Wedding", count: 233 },
    { name: "Festive", count: 619 },
    { name: "Party", count: 131 },
    { name: "Bridal", count: 164 },
    { name: "Casual", count: 68 },
  ];

  const types = [
    { name: "Zari", count: 25 },
    { name: "Embroidery", count: 93 },
    { name: "Handwoven", count: 136 },
    { name: "Printed", count: 59 },
    { name: "Stone work", count: 193 },
  ];

  const colors = [
    "Red",
    "Maroon",
    "Pink",
    "Yellow",
    "Green",
    "Blue",
    "Royal Blue",
    "Purple",
    "Orange",
    "Peach",
    "Gold",
    "Silver",
    "Black",
    "White",
    "Beige",
  ];

  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const searchParams = new URLSearchParams(location.search);

  const searchQuery = searchParams.get("search");

  const { sareeCategory } = useParams();

  console.log(sareeCategory);

  const fetchSareesByCategory = async (sareeCategory) => {
    try {
      const response = await fetch(
        `${temp}/product-related/sarees/${sareeCategory}`
      );
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching sarees:", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetch(`${temp}/search-related/search?search=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [searchQuery]);

  const category = params.get("category");
  const occasion = params.get("occasion");

  const fetchProducts = async (pageNumber) => {
    let fetchProductsUrl;
    if (category) {
      fetchProductsUrl = `${temp}/product-related/getProducts?category=${category}&page=${pageNumber}&limit=12`;
    } else if (occasion) {
      fetchProductsUrl = `${temp}/product-related/getProducts?occasion=${occasion}&page=${pageNumber}&limit=12`;
    } else if (sareeCategory) {
      fetchSareesByCategory(sareeCategory);
    } else {
      fetchProductsUrl = `${temp}/product-related/getProducts?page=${pageNumber}&limit=12`;
    }

    try {
      const response = await fetch(fetchProductsUrl);
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setPage(data.currentPage);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const toggleFilter = (index) => {
    if (openFilters.includes(index)) {
      setOpenFilters(openFilters.filter((i) => i !== index));
    } else {
      setOpenFilters([...openFilters, index]);
    }
  };

  const handleApplyPrice = () => {
    console.log(`Filtering prices from ₹${minPrice} to ₹${maxPrice}`);
  };

  const handleSubcategory = (subcategory) => {
    setSelectedSubCategory((prev) => (prev === subcategory ? "" : subcategory));
    console.log(subcategory);
  };

  const handleFabricSelect = (fabric) => {
    setSelectedFabric((prev) => (prev === fabric ? "" : fabric));
    console.log(fabric);
  };

  const handleOccasion = (occasion) => {
    setSelectedOccasion((prev) => (prev === occasion ? "" : occasion));
    console.log(occasion);
  };

  const handleType = (type) => {
    setSelectedType((prev) => (prev === type ? "" : type));
    console.log(type);
  };

  const handleColor = (color) => {
    setSelectedColor((prev) => (prev === color ? "" : color));
    console.log(color);
  };

  const sortOptions = [
    "Trending",
    "Best Sellers",
    "Price: high to low",
    "Price: low to high",
    "Featured",
  ];

  const [selectedSort, setSelectedSort] = useState("Trending");

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        (minPrice === "" || product.price >= Number(minPrice)) &&
        (maxPrice === "" || product.price <= Number(maxPrice))
    )
    .filter((product) =>
      selectedSubCategory ? product.category === selectedSubCategory : true
    )
    .filter((product) =>
      selectedColor
        ? product.color.toLowerCase().includes(selectedColor.toLowerCase())
        : true
    )
    .filter((product) =>
      selectedFabric ? product.fabric === selectedFabric : true
    )
    .filter((product) =>
      selectedOccasion ? product.occasion === selectedOccasion : true
    )
    .filter((product) =>
      selectedType ? product.workType === selectedType : true
    )
    .sort((a, b) => {
      if (selectedSort === "Price: low to high") return a.price - b.price;
      if (selectedSort === "Price: high to low") return b.price - a.price;
      if (selectedSort === "Featured") return b.featured - a.featured;
      if (selectedSort === "Best Sellers") return b.bestSeller - a.bestSeller;
      return 0;
    });

  return (
    <div className=" mt-3 px-0" style={{ maxWidth: "100vw" }}>
      <div className="filter-products-yash">
        <div
          className={`filter-yash ${
            showMobileFilters ? "mobile-active" : ""
          } col-md-2 me-4 mt-1`}
        >
          <div className="accordion" id="filtersAccordion">
            <h6
              className="fw-bold text-start"
              style={{ fontSize: "13px", marginBottom: "5px" }}
            >
              FILTERS
            </h6>
            {filters.map((filter, index) => (
              <div className="accordion-item rounded-0" key={index}>
                <h2 className="accordion-header">
                  <button
                    className="accordion-button d-flex justify-content-between align-items-center"
                    type="button"
                    onClick={() => toggleFilter(index)}
                    style={{ fontSize: "15px", fontWeight: "400" }}
                  >
                    {filter}
                    <span>{openFilters.includes(index) ? "−" : "+"}</span>
                  </button>
                </h2>
                <div
                  className={`accordion-collapse collapse ${
                    openFilters.includes(index) ? "show" : ""
                  }`}
                >
                  <div className="accordion-body">
                    {filter === "Price" ? (
                      <div className="price-filter">
                        <div className="price-input-container">
                          <span className="currency-symbol">₹</span>
                          <input
                            type="number"
                            placeholder="From"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                          />
                          <span>-</span>
                          <input
                            type="number"
                            placeholder="To"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                          />
                        </div>
                        <button
                          className="apply-button"
                          onClick={handleApplyPrice}
                        >
                          Apply
                        </button>
                      </div>
                    ) : filter === "Categories" ? (
                      <div className="subcategories-filter">
                        {Categories.map((item, index) => (
                          <button
                            key={index}
                            className={`size-button ${
                              selectedSubCategory === item.name
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => handleSubcategory(item.name)}
                          >
                            {item.name}{" "}
                            {/* <span className="count">{item.count}</span> */}
                          </button>
                        ))}
                      </div>
                    ) : filter === "Color" ? (
                      <div className="subcategories-filter">
                        {colors.map((color, index) => (
                          <button
                            key={index}
                            className={`size-button ${
                              selectedColor === color ? "selected" : ""
                            }`}
                            onClick={() => handleColor(color)}
                          >
                            {color}{" "}
                          </button>
                        ))}
                        {/* <input
                          type="text"
                          placeholder="Enter color"
                          value={selectedColor || ""}
                          onChange={(e) =>
                            setSelectedColor(e.target.value.toLowerCase())
                          }
                          className="color-input"
                        /> */}
                      </div>
                    ) : filter === "Fabric" ? (
                      <div className="subcategories-filter">
                        {fabrics.map((fabric, index) => (
                          <button
                            key={index}
                            className={`size-button ${
                              selectedFabric === fabric.name ? "selected" : ""
                            }`}
                            onClick={() => handleFabricSelect(fabric.name)}
                          >
                            {fabric.name}{" "}
                            {/* <span className="count">{fabric.count}</span> */}
                          </button>
                        ))}
                      </div>
                    ) : filter === "Occasion" ? (
                      <div className="subcategories-filter">
                        {occasions.map((occasion, index) => (
                          <button
                            key={index}
                            className={`size-button ${
                              selectedOccasion === occasion.name
                                ? "selected"
                                : ""
                            }`}
                            onClick={() => handleOccasion(occasion.name)}
                          >
                            {occasion.name}{" "}
                            {/* <span className="count">{occasion.count}</span> */}
                          </button>
                        ))}
                      </div>
                    ) : filter === "Work" ? (
                      <div className="subcategories-filter">
                        {types.map((type, index) => (
                          <button
                            key={index}
                            className={`size-button ${
                              selectedType === type.name ? "selected" : ""
                            }`}
                            onClick={() => handleType(type.name)}
                          >
                            {type.name}{" "}
                            {/* <span className="count">{type.count}</span> */}
                          </button>
                        ))}
                      </div>
                    ) : (
                      `${filter} filter content`
                    )}
                  </div>
                </div>
              </div>
            ))}
            <a href="/product-listing">
              <button className="all-products-btn">Show all products</button>
            </a>
          </div>
        </div>

        {window.innerWidth < 750 && (
          <button
            className="floating-filter-btn"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            {showMobileFilters ? "Close Filters" : "Filter +"}
          </button>
        )}

        <button
          className="floating-filter-btn"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          {isFilterOpen ? "Close Filters" : "Filter +"}
        </button>

        <div
          className="col-md-9 products-col"
          style={{ marginLeft: "0", paddingLeft: "0", fontSize: "15px" }}
        >
          <h2 className="text-start mb-4 josefin-sans-josefin">
            Discover the Latest Saree Collection for Women
          </h2>
          <p className="text-start mb-1 body-text">
            Young or aged, preferring classic or contemporary, sarees are a
            versatile choice of Indian clothing that can cater to all kinds of
            personalities and preferences. Women have been enthralled with the
            saree for decades. From classic silk and cotton to georgette and
            chiffon, a saree is ideal for any event, whether it's a wedding,
            festival, or informal get-together.
          </p>
          <div className="filter-dropdowns-container w-100vw">
            <div className="d-flex align-items-center justify-content-end custom-filter-sort  ">
              <span className="me-2" style={{ fontSize: "13px" }}>
                Sort By
              </span>
              <Dropdown onSelect={(eventKey) => setSelectedSort(eventKey)}>
                <Dropdown.Toggle
                  variant="outline-dark"
                  className="custom-dropdown sort-dropdown"
                  style={{ fontSize: "12px", padding: "2px 12px" }}
                >
                  {selectedSort}
                  <span className="text-end">
                    <ExpandMoreIcon />
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="rounded-sort-dropdown">
                  {sortOptions.map((option, index) => (
                    <Dropdown.Item
                      key={index}
                      eventKey={option}
                      active={selectedSort === option}
                    >
                      {option}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className="product-grid-container">
            <div className="product-grid-yash">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <div className="product-card-wrapper-yash" key={index}>
                    <ProductCardFilter product={product} userId={userId} />
                  </div>
                ))
              ) : (
                <p className="no-products-message">
                  No products available for the selected filters.
                </p>
              )}
            </div>
          </div>
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
          {/* <ExploreMore /> */}

          {window.innerWidth < 750 && (
            <button
              className="floating-filter-btn"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              {showMobileFilters ? "Close Filters" : "Filter +"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;
