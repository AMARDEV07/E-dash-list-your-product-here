# E-Dash: E-Commerce Dashboard

E-Dash is a full-stack e-commerce dashboard application that allows users to manage products with authentication. The application provides features for user registration, login, and complete product management (CRUD operations).

---

# Table of Contents
- Features
- Technology Stack
- Project Structure
- Installation
- Usage
- API Endpoints
- Authentication
- Screenshots
- Contributing
- License

---

# Features

## User Authentication
- User registration with form validation to ensure secure and correct data.
- Login system using JWT for secure session management.
- Password visibility toggle for better user experience during login and signup.
- Protected routes to restrict access to authenticated users only.

## Product Management
- Display a list of all products with real-time search functionality.
- Add new products including name, price, company, category, features, description, and technical specifications.
- Edit existing product information effortlessly. 
- Delete products when no longer needed.
- View detailed information about each product including images and specifications.

## Product Details
- Display key information such as product name, price, category, and company.
- Provide a detailed description section for comprehensive product overviews.
- List of special features associated with each product.
- Display technical specifications clearly for the users.
- Upload and view multiple product images to better showcase the products.

---

# Technology Stack

## Frontend
- React.js
- React Router for navigation
- JavaScript (ES6+)
- CSS for styling
- React Toastify for notifications

## Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- CORS for cross-origin resource sharing

---

# Project Structure
```
e-dash/
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── assets/          # Static assets like images
│   │   ├── App.jsx          # Main application component
│   │   └── App.css          # Main application styles
│   └── package.json         # Frontend dependencies
│
└── backend/                 # Node.js backend application
    ├── db/                  # Database models and configuration
    │   ├── config.js        # MongoDB connection setup
    │   ├── user.js          # User model schema
    │   └── Product.js       # Product model schema
    ├── index.js             # Main server file with API routes
    └── package.json         # Backend dependencies
```

---

# Installation

## Prerequisites
- Node.js (v14+)
- MongoDB (v4+)
- npm or yarn

## Step 1: Clone the repository
```bash
git clone https://github.com/yourusername/e-dash.git
cd e-dash
```

## Step 2: Set up the backend
```bash
cd backend
npm install
```

## Step 3: Set up the frontend
```bash
cd ../frontend
npm install
```

## Step 4: Start MongoDB
Ensure MongoDB is running locally.
```bash
mongod
```

---

# Usage

## Step 1: Start the backend server
```bash
cd backend
nodemon index.js
```
Your backend server will be running on `http://localhost:3000`

## Step 2: Start the frontend development server
```bash
cd frontend
npm run dev
```
Your frontend application will be running on `http://localhost:5173` (or another port if 5173 is occupied).

## Step 3: Register a new user
Navigate to `http://localhost:5173/signup` and create an account.

## Step 4: Log in with your credentials
After registering, log in at `http://localhost:5173/login`.

## Step 5: Manage your products
Once logged in, you can:
- View all products
- Add new products
- Update existing products
- Delete products
- View detailed product information

---

# API Endpoints

## Authentication
- `POST /register` - Register a new user
- `POST /login` - Login a user and receive a JWT token

## Products
- `GET /products` - Get all products
- `GET /product/:id` - Get a specific product by ID
- `POST /add-product` - Add a new product
- `PUT /product/:id` - Update a product
- `DELETE /product/:id` - Delete a product
- `GET /search/:key` - Search products by keyword

---

# Authentication

E-Dash uses JWT (JSON Web Tokens) for authentication.
- On login or registration, a JWT token is generated.
- The token is stored in the browser's `localStorage`.
- The token is included with each authenticated request.
- Token expiration is set to 2 hours. After expiry, users must log in again.

---

# Screenshots

> _Replace the placeholders with actual screenshots._

- **Home Page**
- **Product List**
- **Product Detail**
- **Add Product Form**
- **Update Product Form**

---

# Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

# License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Thank you for using E-Dash!** 🚀

