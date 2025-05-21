# Job Recommendation System

## Overview
This project is a **Job Recommendation System** that allows users to:
- Sign up and log in (**JWT Authentication**)
- Upload resumes (**PDF/DOCX**)
- Extract key skills from resumes using **Gemini AI**
- Match extracted skills with **Adzuna API** job listings
- Provide job recommendations based on user skills
- View recommended jobs via an API

## Tech Stack
- **Frontend:** React.js (Vite), Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Resume Parsing:** Gemini AI for extracting key skills
- **Job Listings:** Adzuna API
- **Deployment:** Vercel (Frontend & Backend)

---

## Features
✅ User authentication (Login/Signup using JWT)
✅ Upload resumes (**PDF/DOCX**)
✅ Extract key skills from resumes using **Gemini AI**
✅ Fetch job listings from **Adzuna API**
✅ Match extracted skills with job listings
✅ RESTful APIs for job recommendations
✅ Responsive frontend with React.js

---

## Folder Structure
```
📂 JobForce LLC
 ┣ 📂 frontend (React.js with Vite)
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components (Navbar, ListOfJobs, ProtectedRoute, UploadCard,etc.)
 ┃ ┃ ┣ 📂 pages (SignIn, SignUp, etc.)
 ┃ ┃ ┣ 📜 App.jsx
 ┃ ┃ ┗ 📜 main.jsx
 ┃ ┣ 📜 package.json
 ┃ ┣ 📜 vite.config.js
 ┗ 📂 backend (Node.js, Express.js, MongoDB)
   ┣ 📂 controllers
   ┣ 📂 models
   ┣ 📂 routes
   ┣ 📂 utils
   ┣ 📂 middleware
   ┣ 📜 index.js
   ┣ 📜 .env
   ┗ 📜 package.json
```

---

## Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Mohdadnan2320/JobQuest-.git
cd job-recommendation-system
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
```
Create a **.env** file and add:
```sh
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_API_KEY=your_adzuna_api_key
PORT=3000
FRONTEND_URL=your_frontend_url
```
Start the backend server:
```sh
npm run dev
```

### 3️⃣ Frontend Setup
```sh
cd ../frontend
npm install
```
Create a **.env** file and add:
```sh
VITE_BACKEND_URL=your_backend_url
```
Start the frontend server:
```sh
npm run dev
```

---

## Deployment on Vercel

### **1️⃣ Deploy Backend**
1. Go to [Vercel](https://vercel.com/) and log in.
2. Click **New Project** → Import the **backend** repository.
3. Add environment variables from `.env`.
4. Deploy and copy the backend URL.

### **2️⃣ Deploy Frontend**
1. Go to [Vercel](https://vercel.com/) and log in.
2. Click **New Project** → Import the **frontend** repository.
3. Set **VITE_BACKEND_URL** to the deployed backend URL.
4. Deploy the frontend.

---

## API Endpoints

### **Auth Routes**
| Method | Endpoint       | Description |
|--------|--------------|-------------|
| POST   | /api/register | Register a new user |
| POST   | /api/login  | Authenticate user & return JWT |
| POST   | /api/logout  | Authenticate user & Logout |

### **Resume & Job Routes**
| Method | Endpoint       | Description |
|--------|--------------|-------------|
| POST   | /api/service/upload  | Upload resume & extract skills |
| POST    | /api/service/joblist | Fetch recommended jobs based on skills |

---

## Rights Reserved 
All Rights Reserved © 2025 Mohd Adnan. 
