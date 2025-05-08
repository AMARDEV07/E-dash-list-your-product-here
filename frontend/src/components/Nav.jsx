import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav() {

  
  const navigate = useNavigate();
  //responsive nab
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const auth = localStorage.getItem("user"); // Get 'user' data from localStorage
  let userName = "";  

  // Only try to parse if auth exists
  if (auth) {
    const parsed = JSON.parse(auth);
    userName = parsed?.result?.name || parsed?.name || "";
  }

  function logout() {
    localStorage.clear();
    navigate('/signup');
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
      {/* Logo Section */}
      <div className="logo-div">
        <img src="/src/assets/e-dash-icon.png" alt="icon" />
        <span>e-dash</span>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <i className={isMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        {auth ? (
          // Show these links only when user is logged in
          <ul>
            <li onClick={() => setIsMenuOpen(false)}><Link to="/">Products</Link></li>
            <li onClick={() => setIsMenuOpen(false)}><Link to="/add">Add Product</Link></li>
            <li onClick={() => setIsMenuOpen(false)}><Link to="/update/:id">Update Product</Link></li>
            <li onClick={() => {logout(); setIsMenuOpen(false);}}><Link to="/signup">Logout ({userName})</Link></li>
          </ul>
        ) : (
          // If not logged in, show Signup and Login links
          <ul>
            <li onClick={() => setIsMenuOpen(false)}><Link to="/signup">Signup</Link></li>
            <li onClick={() => setIsMenuOpen(false)}><Link to="/login">Login</Link></li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Nav;