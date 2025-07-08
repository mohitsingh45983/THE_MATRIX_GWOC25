import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

export default function Pagination({ totalPages, page, setPage }) {
  const pageNumbers = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div
      aria-label="Page navigation example "
      style={{ marginTop: "30px", border: "transparent" }}
    >
      <ul
        className="pagination custom-pagination"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {/* Previous Button */}
        <li className="page-item">
          <a
            className="page-link border-0"
            href="#"
            aria-label="Previous"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) setPage(page - 1);
            }}
            style={{
              color: "black",
              cursor: page === 1 ? "not-allowed" : "pointer",
              padding: "10px",
            }}
          >
            <span aria-hidden="true">
              <ArrowBackIosNewOutlinedIcon fontSize="xs" />
            </span>
          </a>
        </li>

        {/* Dynamic Page Numbers */}
        {pageNumbers.map((num) => (
          <li key={num} className="page-item">
            <a
              className="number"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage(num);
              }}
              style={{
                color: page === num ? "white" : "black",
                background: page === num ? "black" : "transparent",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              {num}
            </a>
          </li>
        ))}

        {/* Next Button */}
        <li className="page-item">
          <a
            className="page-link border-0"
            href="#"
            aria-label="Next"
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) setPage(page + 1);
            }}
            style={{
              color: "black",
              cursor: page === totalPages ? "not-allowed" : "pointer",
              padding: "10px",
            }}
          >
            <span aria-hidden="true">
              <ArrowForwardIosOutlinedIcon fontSize="xs" />
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}
