const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/config");
const User = require("./db/user");
const Product = require("./db/product"); // Fixed case sensitivity issue here
const jwt = require("jsonwebtoken");
const jwtKey = "e-comm"; 
const mongoose = require("mongoose");


// Load environment variables
dotenv.config();
const app = express();



app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests)
    if(!origin) return callback(null, true);
    
    // List of allowed origins
    const allowedOrigins = [
      'https://e-dash-list-your-product-here-bcoi.vercel.app',
      'https://e-dash-list-your-product-here-bcoi-m5sj5jzea.vercel.app',
      'https://e-dash-list-your-product-here-bcoi-git-main.vercel.app',
      // Add your Vercel frontend URL here if different from above
      'http://localhost:5173', // For local development
      'https://e-dash-list-your-product-here-3.onrender.com' // Backend URL (for same-origin requests)
    ];
    
    // Check if the origin is in our allowed list OR if it matches a pattern like vercel.app
    if(allowedOrigins.indexOf(origin) !== -1 || 
       origin.endsWith('vercel.app') || 
       !origin) {
      callback(null, true);
    } else {
      console.log("CORS blocked for origin:", origin);
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));



app.use(express.json());



// User Register
app.post("/register", async (req, res) => {
  let user = new User(req.body); // Frontend se aaya data se user create
  let result = await user.save(); // MongoDB me save
  result = result.toObject(); // Object me convert
  delete result.password; // Password delete kar diya for security

  // JWT token generate kar rahe hain (2 hour ke liye valid hoga)
  jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "something went wrong" });
    } 
    res.send({result,auth:token})
  });
});

// User Login karne ka route
app.post("/login", async (req, res) => {
  
  // Pehle check kar rahe hain ki email aur password aaye hain ya nahi
  if (req.body.email && req.body.password) {
    // DB me user ko dhoond rahe hain, password exclude kar ke
    const user = await User.findOne(req.body).select("-password");

    if (user) {
      // Token generate karke client ko bhej rahe hain sign function send with 2
     
      jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({ result: "something went wrong" });
        }
        res.send({ user, auth: token });
      })

    } else {
      res.send({ result: "No user found" });
    }
  } else {
    res.send({ result: "Please provide both email and password" });
  }
});

// Naya product add karne ka route
app.post("/add-product",verifyToken, async (req, res) => {
  const product = new Product(req.body); 
  const result = await product.save(); 
  res.send(result); 
});

// Sare products fetch(list) karne ka route
app.get("/products",verifyToken, async (req, res) => {
  const products = await Product.find();
  res.send(products.length ? products : { result: "No products found" });
});

// Kisi product ko ID ke through delete karne ka route
app.delete("/product/:id",verifyToken, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id }); // ID match karke delete
  res.send(result);
});

// Kisi ek product ki detail lana by ID
app.get("/product/:id",verifyToken, async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id }); // ID ke through search
  res.send(result || { result: "No record found" });
});

// Kisi product ko update karna by ID
app.put("/product/:id",verifyToken, async (req, res) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body } // Jo naya data aaya usse update kar rahe hain
  );
  res.send(result);
});

// Search karna by keyword - name, category, company, etc. me
app.get("/search/:key",verifyToken, async (req, res) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: req.params.key, $options: "i" } },
      { category: { $regex: req.params.key, $options: "i" } },
      { company: { $regex: req.params.key, $options: "i" } },
      { price: { $regex: req.params.key, $options: "i" } },
    ],
  });
  res.send(result); // Jo match hua uska result bhej rahe hain
});

// creating midddle ware for jwt 
function verifyToken(req, res, next) {
  let token = req.headers['authorization'];
  
  if (token) {
    // Split by space (not empty string) to extract token from "Bearer <token>"
    token = token.split(' ')[1];
    // console.warn("middleware called", token);
    
    // Verify token
    jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({result: "Please provide valid token"});
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({result: "Please provide token"});
  }
}

app.listen(3000, () => {
   connectDB();
  console.log("Server running on port 3000");
});