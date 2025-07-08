import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const temp = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch(`${temp}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    setMessage(data.message);
    setLoading(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light px-3">
      {/* Forgot Password Card */}
      <div
        className="card p-5 w-100 text-center"
        style={{ maxWidth: "32rem", border: "1px solid #bbb" }}
      >
        {/* Brand Logo Inside the Card */}
        <Link to="/" className="text-decoration-none mb-4">
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

        <h6 className="mb-3">Forgot Password</h6>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? "Resetting Link..." : "Send Reset Link"}
          </button>
        </form>

        {message && <div className="alert alert-info mt-4">{message}</div>}
      </div>
    </div>
  );
}
