import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
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

    if (email === "" || password === "") {
      alert("form Bhar la ladlaa kahi ki dari hori")
      toast.warn("Please fill in both email and password");
      return;

    }
    
      let result = await fetch("https://e-dash-list-your-product-here-3.onrender.com/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
                 credentials:"include"
      });

      result = await result.json();

      // If user is found, store data in localStorage and navigate
      if (result.auth) {
        toast.success("Login Successful!");
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        setTimeout(() => navigate("/"), 1000);

      } else {
        toast.error("No user found");
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
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span onClick={() => setShowPassword(!showPassword)} // Toggle password visibility state
               style={{
                cursor: "pointer",
                marginLeft: "-70px",
                fontSize: "20px",
                color: "grey" 
              }} > {showPassword ?  <i className="fa-solid fa-eye"></i>:<i className="fa-solid fa-eye-slash"></i> }
            </span>

            
          </div>

          <button onClick={handleLogin}>Login</button>
        </div>


      </div>
      {/* //redirect on signup page */}
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
