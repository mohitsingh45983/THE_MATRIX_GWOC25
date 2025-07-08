import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function ResetPassword() {
  const temp = import.meta.env.VITE_BACKEND_URL;
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`${temp}/auth/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword }),
    });

    const data = await response.json();
    setMessage(data.message);
    setLoading(false);
    if (response.ok) setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-3">
      <div
        className="card p-5  text-center w-100"
        style={{ maxWidth: "28rem", border: "1px solid #bbb" }}
      >
        {/* Brand Logo */}
        <Link to="/" className="text-decoration-none mb-3">
          <h4
            className="text-uppercase"
            style={{
              fontFamily: "Bodoni Moda, serif",
              fontSize: "26px",
              color: "black",
            }}
          >
            KASHVI
          </h4>
        </Link>

        <h6 className="mb-3">Reset Password</h6>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="password"
              className="form-control "
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark  w-100"
            disabled={loading}
          >
            {loading ? "Resetting your password..." : "Reset Password"}
          </button>
        </form>

        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
}
