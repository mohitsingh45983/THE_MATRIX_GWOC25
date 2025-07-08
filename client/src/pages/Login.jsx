import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, setUser } from "../redux/state"; // Import Redux actions
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const temp = import.meta.env.VITE_GOOGLE_CLIENT_ID_LOGIN;

  console.log(temp);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // If using cookies
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(login({ token: data.token }));
        dispatch(setUser(data.user));
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        seterrorMsg(data.message);
      }
    } catch (error) {
      seterrorMsg("Something went wrong!");
    }
    setLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential); // Decode JWT token
    console.log("Google User:", decoded); // Check decoded user details

    const googleUser = {
      email: decoded.email,
      name: decoded.name,
      googleId: decoded.sub, // Unique Google ID
      picture: decoded.picture, // Profile image
    };

    // Send Google user data to backend
    try {
      const response = await fetch(`${URL}/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(googleUser),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        dispatch(login({ token: data.token }));
        dispatch(setUser(data.user));
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/"), 2000);
      } else {
        seterrorMsg(data.message);
      }
    } catch (error) {
      seterrorMsg("Google login failed. Please try again.");
    }
  };

  return (
    <>
      <GoogleOAuthProvider clientId={temp}>
        <div className="signup-container">
          {/* Left side - Banner */}
          <div className="signup-banner">
            <div className="signup-banner-overlay"></div>
            <div className="signup-banner-content">
              <h3 style={{ fontWeight: "300", color: "white" }}>
                Welcome Back to KASHVI
              </h3>
              <p>Sign in to continue.</p>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="signup-form-container">
            <div className="signup-form">
              <h4 style={{ fontWeight: "400" }}>Login</h4>
              <p className="text-muted">
                Enter your credentials to access your account
              </p>

              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address*"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password*"
                  required
                />
                <p className="forgot-password">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </p>
                <button className="login-btn" type="submit" disabled={loading}>
                  {loading ? "Logging in..." : "LOGIN"}
                </button>
              </form>

              {message && <p className="message success">{message}</p>}
              {errorMsg && <p className="message error"> {errorMsg} </p>}

              <div className="social-icons">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => seterrorMsg("Google login failed!")}
                />
              </div>

              <p className="text-muted small-text mt-3">
                Don't have an account?{" "}
                <span className="text-primary">
                  <a href="/signup">Sign Up</a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}
