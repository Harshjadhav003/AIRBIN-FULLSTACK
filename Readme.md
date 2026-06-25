# 🏡 AIRBIN – Full Stack Airbnb Clone

<p align="center">
  <img src="./public/screenshot/Airbnb.png" alt="AIRBIN Banner" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js">
  <img src="https://img.shields.io/badge/Express.js-Framework-black?style=for-the-badge&logo=express">
  <img src="https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb">
  <img src="https://img.shields.io/badge/Cloudinary-Image%20Storage-blue?style=for-the-badge&logo=cloudinary">
  <img src="https://img.shields.io/badge/Render-Deployed-purple?style=for-the-badge&logo=render">
</p>

## 🌍 Overview

AIRBIN is a production-ready Airbnb-inspired full-stack web application that enables users to browse, create, manage, and book property listings.

The project demonstrates real-world backend development practices including authentication, image uploads, MVC architecture, RESTful APIs, cloud integrations, and scalable database design.

---

## 🚀 Live Demo

🔗 **Application**

https://airbin-fullstack-1-32hl.onrender.com/listings

🔗 **GitHub Repository**

https://github.com/Harshjadhav003/AIRBIN-FULLSTACK

---

## 🎯 Problem Statement

Traditional property listing platforms require:

* Secure user authentication
* Property management
* Image storage
* Location visualization
* Booking management

Building all these functionalities together requires a scalable and maintainable full-stack architecture.

---

## 💡 Solution

AIRBIN solves these challenges by providing:

* Secure authentication system
* Property listing management
* Booking workflow
* Cloud image storage
* Interactive maps
* Responsive user experience

using modern web technologies and industry-standard architecture patterns.

---

# 📸 Application Screenshots

## 🏠 Home Page

![Home Page](./public/screenshot/Airbnb.png)

---

## 📋 Property Listings

![Listings](./public/screenshot/Airbnb2.png)

---

## 🏡 Property Details & Booking

![Booking](./public/screenshot/Airbnb3.png)

---

# 🛠 Tech Stack

## Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap

## Backend

* Node.js
* Express.js

## Database

* MongoDB
* Mongoose

## Authentication

* Passport.js
* Express Session

## Cloud Services

* Cloudinary
* Multer

## Maps & Geolocation

* Google Maps API

## Deployment

* Render

---

# ✨ Features

### 🔐 Authentication & Authorization

* User Registration
* User Login
* Secure Password Hashing
* Session Management
* Protected Routes

### 🏠 Property Listings

* Create Property Listings
* Update Property Details
* Delete Listings
* View Property Information
* Responsive Listing Cards

### 📅 Booking System

* Property Reservation
* Booking Management
* User-specific Bookings

### 🖼 Image Management

* Upload Images
* Cloudinary Integration
* Image Optimization

### 🗺 Maps Integration

* Interactive Location Display
* Google Maps Integration
* Location Visualization

### ⚡ Backend Features

* MVC Architecture
* RESTful APIs
* Middleware Handling
* Error Management
* Database Relationships

---

# 🏗 System Architecture

```text
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Express.js  │
│   Routes    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Controllers │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  MongoDB    │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Response   │
└─────────────┘
```

---

# 📂 Project Structure

```bash
AIRBIN-FULLSTACK/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── views/
├── public/
├── cloudConfig.js
├── app.js
├── package.json
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Harshjadhav003/AIRBIN-FULLSTACK.git
```

## Navigate to Project

```bash
cd AIRBIN-FULLSTACK
```

## Install Dependencies

```bash
npm install
```

## Configure Environment Variables

Create a `.env` file:

```env
ATLASDB_URL=your_mongodb_url

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_secret

SECRET=session_secret
MAP_TOKEN=google_maps_api_key
```

## Run Application

```bash
npm start
```

Server will run at:

```bash
http://localhost:8080
```

---

# 📚 Learning Outcomes

Through this project, I gained hands-on experience in:

* REST API Development
* MVC Architecture
* Authentication & Authorization
* MongoDB Schema Design
* Cloudinary Integration
* Google Maps API
* Full Stack Deployment
* Session Management
* Backend Security Practices

---

# 🚀 Future Enhancements

* 💳 Razorpay / Stripe Payment Gateway
* ❤️ Wishlist Functionality
* 📱 Progressive Web App (PWA)
* 🔔 Real-time Notifications
* ⭐ Property Reviews & Ratings
* 📈 Analytics Dashboard
* 🌐 Multi-language Support
* 📨 Email Verification System

---

# 👨‍💻 Developer

**Harsh Jadhav**

* Full Stack Developer
* MERN Stack Enthusiast
* Backend & System Design Learner

GitHub:
https://github.com/Harshjadhav003

---

# ⭐ Support

If you found this project useful, consider giving it a **Star ⭐** on GitHub.

It helps others discover the project and motivates further improvements.
