import { useEffect, useState } from "react";
import EditSareeModal from "./EditSareeModel";
import "../styles/InventoryProducts.css";

const InventoryProducts = () => {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [sarees, setSarees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("low");
  const [editingSaree, setEditingSaree] = useState(null); // Stores selected saree for editing
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSarees = async () => {
      try {
        const response = await fetch(`${URL}/saree-related/get-saree-data`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setSarees(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sarees:", error);
      }
    };
    fetchSarees();
  }, []);

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "low" ? "high" : "low"));
  };

  const filteredProducts = sarees
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sareeId.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) =>
        (minPrice === "" || product.price >= minPrice) &&
        (maxPrice === "" || product.price <= maxPrice)
    )
    .sort((a, b) =>
      sortOrder === "low" ? a.price - b.price : b.price - a.price
    );

  const deleteSaree = async (sareeProductId) => {
    try {
      const response = await fetch(
        `${URL}/saree-related/deleteSaree/${sareeProductId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new ERROR("some error");
      }
      alert("successfully deleted");

      setSarees(sarees.filter((saree) => saree._id !== sareeProductId));
    } catch (error) {
      console.log("Error deleting saree!");
    }
  };

  return (
    <div className="inventory-container">
      {/* Search and Filter Section */}
      <div className="filter-container-yash">
        <input
          type="text"
          className="search-bar"
          placeholder="Search by name or category or Id ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <div className="price-filter-yash">
          <input
            type="number"
            className="price-input-y"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            className="price-input-y"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <button className="sort-btn" onClick={toggleSort}>
          {sortOrder === "low" ? "Sort: Low to High" : "Sort: High to Low"}
        </button> */}
      </div>

      {loading ? (
        <p className="loading-text">Loading products...</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-products">
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <a
                      href={product.images[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="product-img-yash"
                      />
                    </a>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.sareeId}</td>
                  <td className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditingSaree(product);
                        setIsEditModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteSaree(product._id)}
                    >
                      ✖
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Product Table */}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditSareeModal
          saree={editingSaree}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default InventoryProducts;
