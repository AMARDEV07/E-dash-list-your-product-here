# 🛒 E-Dash: E-Commerce Dashboard

**E-Dash** is a full-stack e-commerce dashboard that provides authenticated users with the ability to manage products through a modern and secure interface. Users can register, log in, and perform full CRUD operations on products, making it ideal for managing e-commerce inventories or administrative product portals.

---

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Contributing](#contributing)
- [License](#license)

---

## ✅ Features

### 🔐 User Authentication
- User registration with form validation.
- Secure login using **JWT (JSON Web Tokens)**.
- Password visibility toggle for improved UX.
- Protected routes to prevent unauthorized access.

### 📦 Product Management
- View all products with real-time search.
- Add new products with:
  - Name
  - Price
  - Company
  - Category
  - Features
  - Description
  - Technical specifications
- Edit and update product information.
- Delete products when no longer needed.
- View detailed product data including multiple images.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **React Router** – SPA routing
- **React Toastify** – Notifications
- **JavaScript (ES6+)**
- **CSS**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT** – Authentication
- **CORS** – Cross-origin resource sharing

---

## 🗂️ Project Structure


e-dash/

├── frontend/ # React app
│ ├── src/
│ │ ├── components/ # UI Components
│ │ ├── assets/ # Static files
│ │ ├── App.jsx # Root component
│ │ └── App.css # Global styles
│ └── package.json # Frontend dependencies
│
└── backend/ # Node.js server
├── db/
│ ├── config.js # DB connection setup
│ ├── user.js # User schema
│ └── Product.js # Product schema
├── index.js # Server entry point
└── package.json # Backend dependencies


---

## ⚙️ Installation

### Prerequisites
- **Node.js** (v14+)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/e-dash.git
cd e-dash

### 2. Backend Setup
cd backend
npm install

### 3. Frontend Setup
cd ../frontend
npm install


### 4. Start MongoDB
Ensure MongoDB is running locally:
mongod


### 🚀 Usage
1. Start the Backend
cd backend
nodemon index.js
Runs on http://localhost:3000

### 2. Start the Frontend
cd frontend
npm run dev
Runs on http://localhost:5173

### 3. Register and Login
Visit /signup to register a new user.
Visit /login to authenticate and access the dashboard.

### 4. Manage Products
View product list
Add, edit, or delete products
Access detailed product views

📡 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/register	Register a new user
POST	/login	Log in and get JWT token

Product Routes
Method	Endpoint	Description
GET	/products	Retrieve all products
GET	/product/:id	Get a product by ID
POST	/add-product	Create a new product
PUT	/product/:id	Update a product
DELETE	/product/:id	Delete a product
GET	/search/:key	Search products by keyword

🔐 Authentication
E-Dash uses JWT for secure, stateless authentication:

Tokens are issued on login or registration.

Stored in browser localStorage.

Sent with every protected request in headers.

Token expiration: 2 hours.

🤝 Contributing
Want to improve E-Dash? Follow these steps:

Fork the repo

Create a feature branch
git checkout -b feature/amazing-feature

Commit your changes
git commit -m "Add some amazing feature"

Push to GitHub
git push origin feature/amazing-feature

Open a Pull Request

📄 License
Licensed under the MIT License.
You are free to use, modify, and distribute this project.






