import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Redirect after signup
import "../styles/signup.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { login, setUser } from "../redux/state"; // Import Redux actions

export default function Signup() {
  const URL = import.meta.env.VITE_BACKEND_URL;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Redirect user after signup
  const temp = import.meta.env.VITE_GOOGLE_CLIENT_ID_SIGNUP;

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // **Send OTP to Email**
  const sendOtp = async () => {
    if (!form.email) {
      alert("please provide the data");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${URL}/auth/send-otp-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });

      const data = await response.json();
      if (response.ok) {
        setOtpSent(true);
        setMessage("OTP sent! Please check your email.");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error sending OTP. Try again.");
    }
    setLoading(false);
  };

  // **Verify OTP & Register User**
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const verifyOtpRes = await fetch(`${URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, otp: form.otp }),
      });

      const verifyData = await verifyOtpRes.json();
      if (!verifyOtpRes.ok) {
        setMessage(verifyData.message);
        setLoading(false);
        return;
      }

      // Register user
      const registerRes = await fetch(`${URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
        credentials: "include", // If using cookies
      });

      const registerData = await registerRes.json();
      if (registerRes.ok) {
        // Dispatch login action immediately after successful registration
        dispatch(login({ token: registerData.token }));
        dispatch(setUser(registerData.user));

        setMessage("Signup successful! Redirecting...");
        setTimeout(() => navigate("/"), 2000); // Redirect to home page
      } else {
        setMessage(registerData.message);
      }
    } catch (error) {
      setMessage("Error registering. Try again.");
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
                Register & Be A Part Of The KASHVI Circle!
              </h3>
              <p>Join Now.</p>
            </div>
          </div>

          {/* Right side - Signup Form */}
          <div className="signup-form-container">
            <div className="signup-form">
              <h4 style={{ fontWeight: "400" }}>Sign Up</h4>
              <p className="text-muted">
                Welcome to Kashvi! It's quick and easy to set up an account
              </p>

              <form onSubmit={handleRegister}>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name*"
                  required
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address*"
                  required
                />

                <div className="phone-input">
                  <span className="phone-prefix">+91 IN</span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number*"
                    required
                  />
                </div>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password*"
                  required
                />

                {!otpSent ? (
                  <button type="button" onClick={sendOtp} disabled={loading}>
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </button>
                ) : (
                  <>
                    <input
                      type="text"
                      name="otp"
                      value={form.otp}
                      onChange={handleChange}
                      placeholder="Enter OTP*"
                      required
                    />
                    <button type="submit" disabled={loading}>
                      {loading ? "Registering..." : "Register"}
                    </button>
                  </>
                )}
              </form>

              {message && <p className="message">{message}</p>}

              <p className="text-muted small-text mt-3">
                By continuing, I agree to the Terms of Use and Privacy Policy
              </p>

              <div className="social-icons">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => seterrorMsg("Google login failed!")}
                />
              </div>

              <p className="text-muted small-text mt-3">
                Already have an account?{" "}
                <span className="text-primary">
                  <a href="/login">Sign In</a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}
