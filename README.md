# 🤖 AI Virtual Assistant

A personalized AI Virtual Assistant built using the **MERN Stack** and integrated with the **Google Gemini API**. The application provides an interactive interface where users can create an account, customize their assistant's name and appearance, and interact with an AI-powered assistant.

The project combines full-stack web development, API integration, authentication, and voice-based interaction to create a personalized assistant experience inspired by JARVIS.

---

## 📸 Screenshots

### 🏠 Home Page

The home page displays the selected assistant, its name, and the main interaction interface.


<img width="1920" height="1080" alt="Screenshot 2026-11-03 123418" src="https://github.com/user-attachments/assets/814a23f0-59e6-4863-a448-7604cc1f0ad2" />



### 🎨 Customize Assistant

Users can personalize their assistant by selecting an image from the available options or uploading their own image.

<img width="1920" height="1080" alt="Screenshot 2026-11-03 122742" src="https://github.com/user-attachments/assets/873925a2-d351-43ba-982d-82b5ac7a0f57" />


---

## 📌 Table of Contents

* [Overview](#-overview)
* [Features](#-features)
* [Tech Stack](#️-tech-stack)
* [Project Architecture](#️-project-architecture)
* [How It Works](#-how-it-works)
* [Installation and Setup](#-installation-and-setup)
* [Environment Variables](#-environment-variables)
* [Running the Application](#️-running-the-application)
* [Project Structure](#-project-structure)
* [Future Improvements](#-future-improvements)
* [Author](#-author)

---

## 🌍 Overview

AI Virtual Assistant is a full-stack web application designed to provide users with a personalized assistant experience.

Users can register and log in to the application, select or upload an assistant image, customize their assistant, and interact with it through an intuitive interface.

The application uses Google's Gemini API to generate responses to user queries. The backend manages authentication, user information, database operations, image uploads, and communication with the Gemini API.

The project demonstrates practical implementation of frontend development, REST API integration, database management, authentication, and third-party API integration.

---

## ✨ Features

### 🔐 1. User Authentication

* User registration and login.
* JWT-based authentication.
* Authentication middleware for protected routes.
* User-specific assistant settings.

### 🎨 2. Assistant Customization

* Choose an assistant image from predefined options.
* Upload a custom assistant image.
* Personalize the assistant's name.
* Store assistant-related information in MongoDB.
* Cloudinary integration for image storage.

### 🤖 3. Gemini API Integration

* Integrated Google Gemini API.
* Processes user queries through the backend.
* Generates AI-powered conversational responses.
* Connects the frontend interaction with the Gemini-powered backend.

### 🎙️ 4. Voice Interaction

* Voice-based interaction with the assistant.
* Interactive assistant interface.
* Audio-based feedback and response experience.

### 🖥️ 5. Interactive User Interface

* Modern dark-themed interface.
* Assistant avatar display.
* Customization page.
* Login and registration pages.
* Assistant status display.
* Logout functionality.

---

## 🛠️ Tech Stack

| Category          | Technologies                  |
| ----------------- | ----------------------------- |
| Frontend          | React.js, JavaScript, Vite    |
| Styling           | CSS                           |
| Backend           | Node.js, Express.js           |
| Database          | MongoDB                       |
| AI Integration    | Google Gemini API             |
| Authentication    | JSON Web Token (JWT)          |
| Image Storage     | Cloudinary                    |
| File Upload       | Multer                        |
| State Management  | React Context API             |
| Development Tools | VS Code, Git, GitHub, Postman |

---

## 🏗️ Project Architecture

The application follows a client-server architecture.

```text
                 ┌─────────────────────────┐
                 │       User              │
                 └────────────┬────────────┘
                              │
                              ▼
                 ┌─────────────────────────┐
                 │    React Frontend       │
                 │                         │
                 │  Login / Signup         │
                 │  Home Page              │
                 │  Assistant Customizing  │
                 └────────────┬────────────┘
                              │
                       REST API Requests
                              │
                              ▼
                 ┌─────────────────────────┐
                 │    Express Backend      │
                 │                         │
                 │  Authentication         │
                 │  User Controllers       │
                 │  JWT Middleware         │
                 └────────────┬────────────┘
                              │
                 ┌────────────┼────────────┐
                 │            │            │
                 ▼            ▼            ▼
            MongoDB       Cloudinary    Gemini API
            Database      Image Storage AI Responses
```

### Frontend

The frontend is developed using React.js and Vite.

It contains:

* Authentication pages.
* Assistant customization pages.
* Home page.
* Reusable components.
* React Context for user-related state management.

### Backend

The backend is developed using Node.js and Express.js.

It is responsible for:

* Handling authentication requests.
* Managing user information.
* Verifying JWT tokens.
* Processing file uploads.
* Connecting to MongoDB.
* Communicating with the Gemini API.

### Database

MongoDB is used to store user information and assistant-related data.

### External Services

* **Google Gemini API:** Generates responses to user queries.
* **Cloudinary:** Handles image storage and delivery.

---

## ⚙️ How It Works

### Step 1: User Registration

A new user creates an account using the registration page. User information is processed by the backend and stored in MongoDB.

### Step 2: User Login

The user logs in through the application. The backend handles authentication and generates a JWT token for authenticated access.

### Step 3: Assistant Customization

After logging in, the user can select an assistant image or upload a custom image and personalize the assistant's name.

### Step 4: Image Storage

When a custom image is uploaded, the backend processes the upload using Multer and integrates with Cloudinary for image storage.

### Step 5: AI Interaction

The frontend sends user queries to the backend. The backend communicates with the Google Gemini API and returns the generated response to the frontend.

### Step 6: Assistant Response

The application displays the assistant's response through its interactive interface.

---

## 🚀 Installation and Setup

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB or MongoDB Atlas account
* Git
* Google Gemini API Key
* Cloudinary account

### 1. Clone the Repository

```bash
git clone https://github.com/Mitaleedewangan/AI---Virtual-Assistant.git
```

```bash
cd AI---Virtual-Assistant
```

### 2. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 3. Install Frontend Dependencies

Open another terminal:

```bash
cd Fronted
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside both the `Backend` and `Fronted` directories if required by your configuration.

Add the environment variables used by your application.

**Backend configuration may include:**

```env
PORT=your_port
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
GEMINI_API_KEY=your_gemini_api_key
```

**Frontend configuration:**

Add the backend API base URL if your frontend uses an environment variable for API requests.

```env
VITE_API_URL=your_backend_api_url
```

> Important: Use the exact environment variable names referenced in your source code. Do not upload `.env` files or expose API keys, database credentials, or JWT secrets on GitHub.

---

## ▶️ Running the Application

### Start the Backend

Navigate to the Backend directory:

```bash
cd Backend
```

Install dependencies if you haven't already:

```bash
npm install
```

Start the server using the development script configured in `Backend/package.json`:

```bash
npm run dev
```

### Start the Frontend

Navigate to the Fronted directory:

```bash
cd Fronted
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

---

## 📂 Project Structure

```text
AI---Virtual-Assistant/
│
├── Backend/
│   │
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── token.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── user.controller.js
│   │
│   ├── middlewares/
│   │   ├── isAuth.js
│   │   └── multer.js
│   │
│   ├── models/
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── user.routes.js
│   │
│   ├── public/
│   ├── .env
│   ├── gemini.js
│   ├── index.js
│   └── package.json
│
├── Fronted/
│   │
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── Card.jsx
│   │   │
│   │   ├── context/
│   │   │   └── UserContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Customize.jsx
│   │   │   ├── Customize2.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── SignIn.jsx
│   │   │   └── SignUp.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🔮 Future Improvements

Some features that can be considered for future versions:

* Improved conversational context handling.
* Support for multiple languages.
* More assistant customization options.
* Additional voice interaction improvements.
* Integration with external services and APIs.
* Improved conversation history management.
* Enhanced mobile responsiveness.

---

## 👩‍💻 Author

**Mitalee Dewangan**

Full Stack Developer | MERN Stack Developer

* GitHub: [@Mitaleedewangan](https://github.com/Mitaleedewangan)
* Project Repository: [AI Virtual Assistant](https://github.com/Mitaleedewangan/AI---Virtual-Assistant)

---

## ⭐ Support

If you find this project interesting, consider giving the repository a ⭐ on GitHub!
