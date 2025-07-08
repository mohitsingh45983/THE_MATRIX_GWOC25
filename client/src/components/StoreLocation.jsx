import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Link } from "react-router-dom";

const StoreLocation = () => {
  return (
    <div className="container my-5 p-4 border rounded">
      <div className="row d-flex flex-column flex-lg-row">
        {/* Left Section: Store Info */}
        <div className="col-lg-8 text-start">
          <h4 className="mb-3" style={{ fontSize: "17px", fontWeight: "500" }}>
            KASHVI Sarees
          </h4>
          <p style={{ fontSize: "13px" }}>
            Shop No. 113, Millenium Textile Market - 2 Ring Road, Surat - 395007
          </p>
          <p style={{ fontSize: "13px" }}>Phone: 93764 21333</p>
          <p style={{ fontSize: "13px" }}>Email: kashvicreation10@gmail.com</p>
          <p style={{ fontSize: "13px" }}>Time: 11AM to 9PM - All days Open.</p>
          <p style={{ fontSize: "13px" }}>
            Flagship, Bridal Couture, Ready-To-Wear & Occasion Wear
          </p>

          {/* Buttons (Responsive Alignment) */}
          <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
            <Link to="https://www.google.com/maps?ll=21.194516,72.841811&z=13&t=m&hl=en&gl=IN&mapclient=embed&cid=5015915195930841336">
              <button
                className="btn btn-outline-dark d-flex align-items-center justify-content-center"
                style={{ fontSize: "12px", padding: "10px 20px" }}
              >
                GET DIRECTION
                <ArrowForwardIosOutlinedIcon
                  fontSize="small"
                  className="ms-2"
                />
              </button>
            </Link>
          </div>
        </div>

        {/* Right Section: Google Maps Embed */}
        <div className="col-lg-4 mt-4 mt-lg-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29759.525304461964!2d72.80370217431636!3d21.19451600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e50c564b04b%3A0x459c1c4b94f110f8!2sKashvi%20Sarees!5e0!3m2!1sen!2sin!4v1739546973641!5m2!1sen!2sin"
            style={{
              border: "0",
              width: "100%",
              height: "300px",
            }}
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded shadow"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default StoreLocation;
