import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SignUpPage from "./components/SignUpPage";
import PrivateComp from "./components/PrivateComp";
import LoginPage from "./components/LoginPage";
import AddProduct from "./components/AddProduct";
import ProductsList from "./components/ProductsList";
import UpdateProduct from "./components/UpdateProduct";
import ProductDetail from "./components/ProductDetail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Nav /> {/* Navigation visible on all pages */}

        <div className="main-content">
          <Routes>
            {/* Protected Routes */}
            <Route element={<PrivateComp />}>
              <Route path="/" element={<ProductsList />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/update/:id" element={<UpdateProduct />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/logout" element={<h1>page logout</h1>} />
            </Route>

            {/* Public Route */}
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;