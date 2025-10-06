# Prompt Whisper - AI-Powered Prompt Enhancement

<div align="center">

![Prompt Whisper](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-green?style=for-the-badge&logo=fastapi)

**Transform your prompts into high-quality, production-ready instructions with AI-powered analysis and enhancement.**

[Live Demo](#) | [Documentation](./backend/README.md) | [Report Bug](#) | [Request Feature](#)

</div>

---

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Analysis** - Uses Google Gemini 2.5 Flash to analyze prompt quality
- **Performance Scoring** - Get a 0-10 score with detailed metrics (Clarity, Context, Specificity)
- **Smart Enhancement** - Automatically generates optimized, production-ready prompts
- **Actionable Feedback** - Receive strengths and specific improvement suggestions
- **Multi-Platform Export** - Send enhanced prompts directly to ChatGPT, Claude, Gemini, or Copilot

### 🎨 User Experience
- **Beautiful UI** - Glassmorphic design with animated prism background
- **Real-time Validation** - Client-side checks prevent invalid submissions
- **Toast Notifications** - Clear feedback for all user actions
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Loading States** - Skeleton loaders and progress indicators

### 📊 Task Types Supported
- 💻 **Coding** - Technical programming tasks
- ✍️ **Content Writing** - Blog posts, articles, copy
- 🔍 **Research** - Analysis and investigation
- 🎨 **Creative** - Creative writing and ideation
- 📋 **General** - All-purpose prompts

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ and npm
- **Python** 3.9+
- **Google Gemini API Key** ([Get one here](https://aistudio.google.com/apikey))
- **Supabase Account** ([Sign up](https://supabase.com))

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/prompt-Whisper.git
   cd prompt-Whisper
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment** (Optional)
   ```bash
   # Create .env file in root directory
   echo "VITE_API_URL=http://localhost:8000" > .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Backend Setup

See [Backend README](./backend/README.md) for detailed setup instructions.

**Quick Start:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # Add your API keys
uvicorn app.main:app --reload
```

---

## 🏗️ Project Structure

```
prompt-Whisper/
├── src/                          # Frontend source code
│   ├── components/               # React components
│   │   ├── InputPanel.jsx       # Prompt input form
│   │   ├── OutputPanel.jsx      # Results display
│   │   ├── LandingPage.jsx      # Landing page
│   │   └── Prism.jsx            # Animated background
│   ├── App.jsx                  # Main app component
│   └── main.jsx                 # Entry point
│
├── backend/                     # FastAPI backend
│   ├── app/
│   │   ├── api/routes/         # API endpoints
│   │   ├── services/           # Business logic
│   │   ├── db/                 # Database layer
│   │   ├── models/             # Pydantic schemas
│   │   └── core/               # Configuration
│   └── requirements.txt
│
├── public/                      # Static assets
├── package.json
└── vite.config.js              # Vite configuration
```

---
## 🎯 How It Works

### 1. **Input Your Prompt**
Enter your prompt and select the task type (Coding, Content Writing, Research, Creative, or General).

### 2. **AI Analysis**
Google Gemini 2.5 Flash analyzes your prompt across three key metrics:
- **Clarity** - How clear and understandable is the prompt?
- **Context** - Does it provide sufficient background information?
- **Specificity** - Are requirements well-defined?

### 3. **Get Results**
- ⭐ **Score** (0-10) - Overall quality rating
- ✅ **Strengths** - What works well in your prompt
- ⚠️ **Corrections** - Specific improvements needed
- ✨ **Enhanced Prompt** - Production-ready optimized version

### 4. **Use Enhanced Prompt**
- 📋 Copy to clipboard
- 🚀 Send directly to your favorite LLM (ChatGPT, Claude, Gemini, Copilot)

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS
- **Lucide React** - Icon library
- **React Hot Toast** - Toast notifications

### Backend
- **FastAPI** - Python web framework
- **Google Gemini 2.5 Flash** - AI model
- **Supabase** - PostgreSQL database
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

---

## 📱 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
uvicorn app.main:app --reload           # Development server
uvicorn app.main:app --host 0.0.0.0     # Production server
python -m pytest                         # Run tests (when available)
```

---

## 🔧 Configuration

### Frontend Configuration

**Environment Variables:**
```env
VITE_API_URL=http://localhost:8000  # Backend API URL
```

**Vite Config** (`vite.config.js`):
```javascript
export default {
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8000'
    }
  }
}
```

### Backend Configuration

See [Backend README](./backend/README.md) for detailed configuration.

---

## 🚀 Deployment

### Recommended Deployment Stack

| Component | Platform | Free Tier |
|-----------|----------|-----------|
| **Frontend** | Vercel | ✅ Yes |
| **Backend** | Render | ✅ Yes (750hrs/mo) |
| **Database** | Supabase | ✅ Yes (500MB) |

### Quick Deploy

#### Frontend (Vercel)
```bash
npm install -g vercel
vercel
```

#### Backend (Render)
1. Connect your GitHub repo to Render
2. Select `backend` folder
3. Add environment variables
4. Deploy!

**Detailed deployment guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md) *(to be created)*

---

## 📊 API Endpoints

### Base URL
```
http://localhost:8000/api/v1
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/analyze` | Analyze and enhance a prompt |
| `GET` | `/history` | Get prompt analysis history |
| `GET` | `/{id}` | Get specific analysis by ID |
| `DELETE` | `/{id}` | Delete an analysis |

**Full API Documentation:** http://localhost:8000/docs (when backend is running)

---

## 🎨 UI Components

### InputPanel
- Prompt textarea with character counter
- Task type selector
- Optional context field
- Form validation

### OutputPanel
- Circular score gauge
- Metrics chips (Clarity, Context, Specificity)
- Strengths list (green)
- Corrections list (yellow)
- Enhanced prompt display
- Copy to clipboard button
- Send to LLM dropdown (ChatGPT, Claude, Gemini, Copilot)

### LandingPage
- Hero section
- Feature highlights
- Call-to-action

---

## 🔒 Security & Privacy

- ✅ Client-side input validation
- ✅ Server-side validation with Pydantic
- ✅ CORS protection
- ✅ Environment variables for secrets
- ✅ No sensitive data logged
- ⚠️ Authentication not implemented (add if needed)

---

## 📈 Performance

- **Frontend**: Lightning fast with Vite HMR
- **Backend**: Async FastAPI with optimized database queries
- **AI Response Time**: ~15-30 seconds (Gemini API)
- **Caching**: Browser cache for static assets

---

## 🐛 Troubleshooting

### Frontend Issues

**Problem**: API calls failing
```bash
# Check if backend is running
curl http://localhost:8000/health

# Verify CORS settings in backend/app/main.py
```

**Problem**: Toast notifications not showing
```bash
# Ensure react-hot-toast is installed
npm install react-hot-toast
```

### Backend Issues

**Problem**: Gemini API errors
- Check API key is valid
- Verify model name: `gemini-2.5-flash`
- Check API quota at [Google Cloud Console](https://console.cloud.google.com)

**Problem**: Supabase connection errors
- Verify URL and API key in `.env`
- Run database migration (see backend README)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful language model
- **Supabase** for database infrastructure
- **FastAPI** for excellent Python framework
- **React** & **Vite** for modern frontend tooling

---

## 📞 Support

- 📧 Email: support@promptWhisper.ai *(replace with actual)*
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/prompt-Whisper/issues)
- 💬 Discord: [Join our community](#) *(if available)*

---

<div align="center">

**Made with ❤️ by Divyansh Joshi**
⭐ Star this repo if you find it helpful!
</div>