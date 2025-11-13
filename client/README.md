# 🎓 StudyMate — Find Your Perfect Study Partner

A full-stack MERN-style project that connects students based on shared study interests, subjects, and goals.  
Users can create personal profiles, browse potential study partners, and send or manage connection requests.

---

## 🚀 Live Demo

Frontend (Netlify): https://studymate-hero-a10.netlify.app  
Backend (Vercel API): https://studymate-hero-a10.vercel.app  

---

## 🧩 Core Features

### 👤 User Authentication
- Email/password login & registration via **Firebase Auth**
- Google Sign-In integration
- Persistent login with AuthContext

### 🪪 Profile Management
- Create and edit your study profile
- Upload profile image using direct URL
- Store data in **MongoDB Atlas**
- Real-time validation and success feedback

### 🔎 Partner Discovery
- Search and sort by name, subject, or location
- Responsive partner card layout with avatars
- “Send Request” and “View Details” modals

### 💬 Connection Requests
- Users can send, view, accept, or delete requests
- Fully synced with MongoDB Atlas via Express routes
- Real-time updates reflected in “My Connections” page

### 📊 Dashboard
- Displays user stats (partners, requests, accepted connections)
- Summarized activity and performance overview

### 🌗 UI/UX Features
- Responsive layout (mobile-first)
- Dark / Light theme toggle
- Toast notifications for all operations
- Tailwind CSS & DaisyUI styling

---

## 🏗️ Project Structure

hero-A10/
│
├── client/ # Frontend (React + Vite)
│ ├── src/
│ │ ├── components/ # Navbar, Footer, PartnerModal, etc.
│ │ ├── context/ # AuthContext.jsx
│ │ ├── pages/ # Home, FindPartners, MyConnections, CreateProfile, Dashboard
│ │ ├── services/ # api.js — central API service
│ │ └── main.jsx, App.jsx
│ ├── index.html
│ └── package.json
│
├── server/ # Backend (Node.js + Express)
│ ├── config/
│ │ └── db.js # MongoDB Atlas connection
│ ├── routes/
│ │ ├── partnerRoutes.js # CRUD for profiles
│ │ └── requestRoutes.js # CRUD for requests
│ ├── index.js # Express app entry point
│ └── package.json
│
├── .env # Environment variables
├── .gitignore