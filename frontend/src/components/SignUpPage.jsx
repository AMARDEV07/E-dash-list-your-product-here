import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_CONFIG from '../config/api'; // Import the API config

function SignUpPage() {
  // Input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const navigate = useNavigate();

  // If user already logged in, redirect to home
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  // Submit handler
  const submit = async () => {
    // === Name Validation ===
    if (!name.trim()) {
      toast.error("Name is required!");
      return;
    }
    if (!/^[A-Za-z ]{2,}$/.test(name)) {
      toast.error("Name must contain only letters and be at least 2 characters.");
      return;
    }

    // === Email Validation ===
    if (!email.trim()) {
      toast.error("Email is required!");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // === Password Validation ===
    if (!password) {
      toast.error("Password is required!");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      toast.error("Password must contain at least 1 uppercase letter, 1 number, and 1 special character.");
      return;
    }

    try {
      setLoading(true);
      
      // === API Call ===
      let result = await fetch(`${API_CONFIG.BASE_URL}/register`, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });

      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }

      result = await result.json();

      // === Handle Result and save them in local storage ===
      if (result) {
        toast.success("Registration Completed!");
        localStorage.setItem("user", JSON.stringify(result.result)); 
        localStorage.setItem("token", JSON.stringify(result.auth));
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-div">
      <div className="container">
        {/* //left section */}
        <div className="signup-details">
          <div className="Header-div">
            <img className="icon" src="src/assets/log-in.png" alt="" />
            <h1 className="signup-h1">Create an account</h1>
            <p className="sigup-p">Lorem ipsum dolor sit amet.</p>
          </div>

          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            onClick={submit}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <div className="old-acc">
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </div>

        {/* === right image section === */}
        <div className="signup-img-div">
          <img src="/src/assets/signup.jpg" alt="Signup Visual" />
        </div>
      </div>

      {/* === Toastify Alert Container === */}
      <ToastContainer />
    </div>
  );
}

export default SignUpPage;