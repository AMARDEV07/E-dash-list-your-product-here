import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_CONFIG from '../config/api'; // Import the API config

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Using useEffect to redirect if the user is already logged in
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) { 
      navigate("/");
    }
  }, []);

  // API call for login
  const handleLogin = async () => {
    // Form validation
    if (email === "" || password === "") {
      toast.warn("Please fill in both email and password");
      return;
    }
    
    try {
      setLoading(true);
      
      const result = await fetch(`${API_CONFIG.BASE_URL}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });

      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      const data = await result.json();

      // If user is found, store data in localStorage and navigate
      if (data.auth) {
        toast.success("Login Successful!");
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", JSON.stringify(data.auth));
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(data.result || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-div">
      <div className="container">
        <div className="login-details">
          <img className="icon" src="src/assets/log-in.png" alt="" />
          <h1 className="signup-h1">Login to Your Account</h1>
          <p className="sigup-p">Enter your email and password to login.</p>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span 
              onClick={() => setShowPassword(!showPassword)}
              style={{
                cursor: "pointer",
                marginLeft: "-70px",
                fontSize: "20px",
                color: "grey" 
              }}
            >
              {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
            </span>
          </div>

          <button 
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
      
      {/* Redirect to signup page */}
      <div className="new-account">
        <div>
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;