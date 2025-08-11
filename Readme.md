# 🚀 CodeMentor Hub – Learn, Practice, Quiz & Chat with AI!

**CodeMentor Hub** is a full-stack, AI-integrated coding platform for engineering students. It helps users **learn coding**, **practice problems**, **take quizzes**, and even **ask doubts to an AI tutor** – all in one place.

---

## 🎯 Features

- 📘 **Courses:** Structured lessons in DSA, OS, DBMS, etc.
- 💻 **Code Practice:** Built-in code editor with support for multiple languages.
- 🧪 **Quizzes:** Auto-generated MCQs with explanations.
- 🤖 **AI Chatbot:** Ask topic-related or problem-specific questions anytime.
- 📊 **User Dashboard:** Progress tracker, XP points, and topic recommendations.
- 🏅 **Gamification:** Badges, leaderboards, and achievements.
- 🔒 **Auth System:** JWT-based authentication and protected routes.

---

## 🗂️ Folder Structure

codementor-hub/
├── client/ # React Frontend
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ │ ├── Navbar.jsx
│ │ │ ├── Footer.jsx
│ │ │ ├── CourseCard.jsx
│ │ │ ├── CodeEditor.jsx
│ │ │ └── Chatbot.jsx
│ │ ├── pages/
│ │ │ ├── Home.jsx
│ │ │ ├── Courses.jsx
│ │ │ ├── Practice.jsx
│ │ │ ├── Quiz.jsx
│ │ │ ├── Chatbot.jsx
│ │ │ └── Dashboard.jsx
│ │ ├── context/
│ │ │ └── AuthContext.js
│ │ ├── utils/
│ │ │ ├── api.js
│ │ │ └── constants.js
│ │ ├── styles/
│ │ │ └── main.css
│ │ └── App.jsx
│ ├── .env
│ └── vite.config.js
│
├── server/ # Express Backend
│ ├── controllers/
│ │ ├── authController.js
│ │ ├── courseController.js
│ │ ├── quizController.js
│ │ ├── codeController.js
│ │ └── chatController.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── courseRoutes.js
│ │ ├── quizRoutes.js
│ │ ├── codeRoutes.js
│ │ └── chatRoutes.js
│ ├── models/
│ │ ├── User.js
│ │ ├── Course.js
│ │ ├── Quiz.js
│ │ ├── Problem.js
│ │ └── Submission.js
│ ├── middleware/
│ │ ├── authMiddleware.js
│ │ └── errorHandler.js
│ ├── config/
│ │ └── db.js
│ ├── utils/
│ │ ├── openai.js
│ │ └── judge0.js
│ ├── uploads/
│ ├── .env
│ ├── app.js
│ └── server.js
│
├── README.md
├── package.json
└── .env


---

## ⚙️ Tech Stack

| Layer         | Technology                  |
|---------------|------------------------------|
| Frontend      | React + Tailwind CSS         |
| Backend       | Node.js + Express            |
| Database      | MongoDB + Mongoose           |
| Authentication| JWT + bcrypt                 |
| Code Compiler | Judge0 API                   |
| AI Chatbot    | OpenAI GPT-4 API             |
| Deployment    | Vercel (client), Render (server)

---

## 🤖 AI Chatbot Integration

### 🔗 API Endpoint:

## secure

| Area               | Checklist                          |
| ------------------ | ---------------------------------- |
| Authentication     | JWT (secure, HTTP-only cookies)    |
| Input Sanitization | express-validator, xss-clean       |
| Rate Limiting      | express-rate-limit                 |
| Headers            | helmet                             |
| AI Usage Limits    | Abuse filter, prompt length check  |
| HTTPS              | Force HTTPS in Vercel, Render      |
| Secure Cookies     | Secure, HttpOnly, SameSite cookies |
| CORS Policy        | Allow only your frontend origin    |
| Role Access        | Admin vs user route guards         |
