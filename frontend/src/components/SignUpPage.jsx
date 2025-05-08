import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUpPage() {
  // Input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

 
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

    // === API Call ===
    let result = await fetch("https://e-dash-list-your-product-here-2.onrender.com/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    result = await result.json();

    // === Handle Result and save them in local storage ===
    if (result) {
      toast.success("Registration Completed!");
      localStorage.setItem("user", JSON.stringify(result.result)); 
      localStorage.setItem("token", JSON.stringify(result.auth));// Save to localStorage
      setTimeout(() => navigate("/"), 1000); //jesi login hoga navigate krna home pa
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
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility state
              style={{
                cursor: "pointer",
                marginLeft: "-70px",
                fontSize: "20px",
                color: "grey"
              }}
            >
              {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>} {/* Emoji toggle for password visibility */}
            </span>
          </div>

          <button onClick={submit}>Sign Up</button>

          <div className="old-acc">
            <p> have an account? <Link to="/login">Login</Link></p>
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
