import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/dropdown.css"; // Scoped styles
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilterDropdowns = () => {
  const filters = ["Occasion", "Categories", "Fabric"];
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const sortOptions = [
    "Trending",
    "Best Sellers",
    "Price: high to low",
    "Price: low to high",
    "Featured",
  ];

  const [selectedSort, setSelectedSort] = useState("Trending");
  const Occasions = [
    { name: "Wedding", count: 233 },
    { name: "Festive", count: 619 },
    { name: "Party", count: 131 },
    { name: "Bridal", count: 164 },
    { name: "Casual", count: 68 },
  ];

  const categories = [
    { name: "Banarasi Saree", count: 25 },
    { name: "Chiffon Saree", count: 93 },
    { name: "Cotton Saree", count: 136 },
    { name: "Silk Saree", count: 59 },
    { name: "Handloom Saree", count: 193 },
    { name: "Kanjeevaram Sarees", count: 15 },
  ];

  const fabrics = [
    { name: "Cotton", count: 5 },
    { name: "Georgette", count: 135 },
    { name: "Chiffon", count: 7 },
    { name: "Net", count: 41 },
    { name: "Silk", count: 155 },
  ];

  return (
    <div className="filter-dropdowns-container d-flex justify-content-between align-items-center flex-wrap gap-3">
      {/* Filter Buttons */}
      <div className="d-flex gap-2">
        {filters.map((filter, index) => (
          <Dropdown key={index} onToggle={() => toggleDropdown(index)}>
            <Dropdown.Toggle
              variant="outline-dark"
              className="custom-dropdown"
              id={`dropdown-${index}`}
              style={{
                fontSize: "12px",
                padding: "2px 10px 2px 10px",
              }}
            >
              {filter}{" "}
              <span>
                {openDropdown === index ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </span>
            </Dropdown.Toggle>

            <Dropdown.Menu className="rounded-dropdown">
              <div className="dropdown-options">
                {(filter === "Occasion"
                  ? Occasions
                  : filter === "Categories"
                  ? categories
                  : filter === "Fabric"
                  ? fabrics
                  : []
                ).map((item, i) => (
                  <button
                    key={i}
                    className="dropdown-option"
                    onClick={() =>
                      console.log(
                        `${filter} - ${item.name || item.label || item}`
                      )
                    }
                  >
                    {item.name || item.label || item}{" "}
                    {(item.count || item.count === 0) && (
                      <span className="count">({item.count})</span>
                    )}
                  </button>
                ))}
              </div>
            </Dropdown.Menu>
          </Dropdown>
        ))}
      </div>

      {/* Sort Dropdown */}
      <div className="d-flex align-items-center">
        <span className="me-2" style={{ fontSize: "13px" }}>
          Sort By
        </span>
        <Dropdown onSelect={(eventKey) => setSelectedSort(eventKey)}>
          <Dropdown.Toggle
            variant="outline-dark"
            className="custom-dropdown sort-dropdown"
            style={{
              fontSize: "12px",
              padding: "2px 12px 2px 12px",
            }}
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
  );
};

export default FilterDropdowns;
