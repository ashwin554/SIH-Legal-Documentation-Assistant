# ⚖️ Nayay Shala Legal Sahayak — AI-Powered Legal Documentation Assistant

<div align="center">

**Smart India Hackathon (SIH) Project**

An AI-powered full-stack web application that helps users draft, review, and manage Indian legal documents using locally-hosted LLM technology.

[Live Demo](#) · [Features](#features) · [Setup](#setup) · [Tech Stack](#tech-stack)

</div>

---

## ✨ Features

### 🤖 AI-Powered Document Drafting
- Interactive chat-based document creation powered by **Ollama (qwen2.5:7b)**
- Smart clause suggestions and legal language enhancement
- Document review with risk analysis

### 📄 12+ Indian Legal Templates
- Non-Disclosure Agreement (NDA)
- Rental/Lease Agreement (11-month standard)
- Employment Contract
- Power of Attorney
- Will/Testament
- Partnership Deed
- Sale Agreement
- Service Level Agreement
- Affidavit
- Legal Notice
- Memorandum of Understanding
- Freelancer Agreement

### 🔍 AI Legal Q&A
- Ask legal questions in natural language
- Responses reference Indian statutes (Indian Contract Act 1872, BNS, BNSS, etc.)
- Clear disclaimer: Not a substitute for professional legal advice

### ✏️ Rich Document Editor
- In-browser document editing with formatting toolbar
- Version tracking (Draft → Review → Final)
- Auto-save functionality

### 📥 Professional PDF Export
- Export documents as professionally formatted PDFs
- Headers, footers, page numbers
- Print-ready layouts

### 🔒 100% Local & Private
- All AI processing happens on your machine via Ollama
- No data sent to external servers
- SQLite database — no cloud database required

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite) |
| Styling | Vanilla CSS with Design Tokens |
| Backend | Node.js + Express.js |
| AI Engine | Ollama (qwen2.5:7b) |
| Database | SQLite (better-sqlite3) |
| Auth | JWT + bcrypt |
| PDF | PDFKit |

---

## 🚀 Setup

### Prerequisites
- **Node.js** v18+ 
- **Ollama** installed and running ([ollama.com](https://ollama.com))
- **qwen2.5:7b** model pulled: `ollama pull qwen2.5:7b`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ashwin554/SIH-Legal-Documentation-Assistant.git
cd SIH-Legal-Documentation-Assistant

# 2. Install dependencies
cd server && npm install
cd ../client && npm install
cd ..

# 3. Make sure Ollama is running
ollama serve

# 4. Start the backend (Terminal 1)
cd server && npm run dev

# 5. Start the frontend (Terminal 2)
cd client && npm run dev
```

### Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Ollama**: http://localhost:11434

---

## 📁 Project Structure

```
├── client/                  # React Frontend (Vite)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── styles/          # CSS design system
│   │   └── utils/           # API client & auth helpers
│   └── ...
│
├── server/                  # Express.js Backend
│   ├── routes/              # API route handlers
│   ├── middleware/          # JWT auth middleware
│   ├── models/              # Database setup
│   ├── services/            # Ollama & PDF services
│   └── data/                # Template definitions
│
├── .gitignore
├── README.md
└── package.json
```

---

## 🎨 Design

- **Dark mode** by default — premium, eye-friendly for document work
- **Navy + Teal + Gold** color palette — trust, modernity, Indian cultural resonance
- **Glassmorphism** cards with backdrop blur
- **Micro-animations** for enhanced user experience
- **Fully responsive** — works on desktop, tablet, and mobile

---

## ⚠️ Disclaimer

This application is a **technology demonstration** built for the Smart India Hackathon. It is **not a substitute for professional legal advice**. Always consult a qualified legal professional for actual legal matters.

---

## 👨‍💻 Author

**Ashwin** — [@ashwin554](https://github.com/ashwin554)

Built with ❤️ for Smart India Hackathon 2024

---

## 📜 License

MIT License — see [LICENSE](LICENSE) for details.
