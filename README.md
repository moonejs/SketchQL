<div align="center">

# SketchQL

### AI-powered database schema design — describe your data model in plain English, get a visual diagram and production-ready code instantly.

[![Live Demo](https://img.shields.io/badge/🔗%20Live%20Demo-sketchql2.vercel.app-2563eb?style=for-the-badge)](https://sketchql2.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-moonejs%2FSketchQL-181717?style=for-the-badge&logo=github)](https://github.com/moonejs/SketchQL)

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Gemini%20AI-4285F4?style=flat-square&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## 🧠 What is SketchQL?

Designing a database schema usually means juggling diagrams, SQL scripts, and ORM models across multiple tools — all manually. **SketchQL** collapses that into one workflow: type a plain-English description of your data model and get back an interactive visual diagram with production-ready **SQL** or **Mongoose** code.

> *"A blog platform with users, posts, comments, and likes"* → instant schema diagram + exportable code.

---

## ✨ Features

- 🤖 **AI Schema Generation** — Natural language → schema via Google Gemini API
- 🗂️ **Interactive Visual Editor** — Drag, connect, and edit nodes with React Flow
- 💾 **Dual Code Export** — One-click export as SQL `CREATE TABLE` or Mongoose models
- 🔐 **User Accounts** — JWT authentication with saved schemas
- 📱 **Responsive UI** — Clean Bootstrap 5 interface across devices

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, React Flow, Bootstrap 5, JavaScript |
| **Backend** | Node.js, Express, REST API |
| **Database** | MongoDB, Mongoose |
| **AI** | Google Gemini API |
| **Auth** | JWT (JSON Web Tokens) |
| **Deployment** | Vercel |

---

## ⚙️ How it works

```
User types prompt
      ↓
Backend sends to Gemini API with structured system instruction
      ↓
Gemini returns JSON schema definition
      ↓
Validation & normalization layer cleans the response
      ↓
React Flow renders interactive diagram
      ↓
User exports as SQL or Mongoose code
```

---

## 📁 Project Structure

```
SketchQL/
├── frontend/
│   ├── src/
│   │   ├── components/    # React Flow canvas, node types, export panel
│   │   ├── pages/         # Auth pages, dashboard, schema editor
│   │   └── utils/         # AI response parser & normalizer
│   └── package.json
│
└── backend/
    ├── routes/            # Auth, schema, AI generation endpoints
    ├── models/            # Mongoose user & schema models
    ├── middleware/        # JWT verification
    └── server.js
```

---

## 🚀 Local Setup

```bash
# Clone
git clone https://github.com/moonejs/SketchQL.git
cd SketchQL

# Backend
cd backend && npm install

# Create backend/.env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

node server.js

# Frontend (new terminal)
cd ../frontend && npm install && npm run dev
```

---

## 🧩 Key Engineering Challenges

**🔴 Reliable AI output** — Gemini occasionally returns malformed JSON that crashes the diagram renderer. Built a validation and normalization layer that cleans responses before they reach React Flow, with graceful error fallbacks.

**🟡 React Flow state sync** — Keeping the interactive diagram in sync with the underlying schema required careful state management using `useCallback` and `useReducer` to ensure exports always reflect the current diagram state.

**🟢 JWT auth flow** — First production SaaS with full authentication — implemented secure token storage, protected routes, and auth state management across the full React app.

---

## 👤 Author

**Litesh** — IIT Madras, BS in Data Science & Applications

[![GitHub](https://img.shields.io/badge/@moonejs-181717?style=flat-square&logo=github)](https://github.com/moonejs)
[![Email](https://img.shields.io/badge/24f2003468@ds.study.iitm.ac.in-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:24f2003468@ds.study.iitm.ac.in)

---

<div align="center">
<sub>Built solo as a full-stack AI product — from prompt engineering to deployment.</sub>
</div>
