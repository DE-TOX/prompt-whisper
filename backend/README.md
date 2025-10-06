# Prompt Whisper Backend API

FastAPI backend for Prompt Whisper - AI-powered prompt analysis and enhancement using Google Gemini 1.5 Flash and Supabase.

## 🏗️ Architecture

### Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── routes/
│   │       └── prompt_routes.py      # API endpoints
│   ├── core/
│   │   └── config.py                 # Configuration & settings
│   ├── db/
│   │   └── supabase.py              # Supabase service layer
│   ├── models/
│   │   └── schemas.py               # Pydantic models
│   ├── services/
│   │   └── gemini_service.py        # Google Gemini AI service
│   └── main.py                      # FastAPI application
├── requirements.txt
├── .env.example
└── README.md
```

### Separation of Concerns

- **Routes** (`api/routes/`): Handle HTTP requests/responses
- **Services** (`services/`): Business logic (AI analysis)
- **Database** (`db/`): Data persistence layer (Supabase)
- **Models** (`models/`): Data validation schemas
- **Core** (`core/`): Configuration management

## 🚀 Features

### API Endpoints

#### 1. Analyze Prompt

```http
POST /api/v1/analyze
```

Analyzes a prompt and returns an enhanced version with metrics.
**Request Body:**

```json
{
  "prompt": "Write a blog post about AI",
  "task_type": "creative",
  "context": "For a tech-savvy audience"
}
```

**Response:**

```json
{
  "id": "uuid",
  "score": 8.5,
  "metrics": {
    "clarity": "High",
    "context": "Medium",
    "specificity": "High"
  },
  "strengths": ["Clear objective", "Well-structured"],
  "corrections": ["Add more context", "Specify target audience"],
  "enhanced_prompt": "Enhanced prompt text...",
  "created_at": "2024-01-01T00:00:00Z"
}
```

#### 2. Get History

```http
GET /api/v1/history?limit=10&offset=0
```

Retrieve prompt analysis history with pagination.

#### 3. Get Prompt by ID

```http
GET /api/v1/{prompt_id}
```

Retrieve a specific prompt analysis.

#### 4. Delete Prompt

```http
DELETE /api/v1/{prompt_id}
```

Delete a prompt analysis.

## 📦 Installation

### Prerequisites

- Python 3.9+
- Google Gemini API key
- Supabase account

### Step 1: Clone and Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```

### Step 2: Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
GOOGLE_API_KEY=your_google_api_key
GEMINI_MODEL=gemini-1.5-flash

SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key

DEBUG=False
```

### Step 3: Setup Supabase Database

Run this SQL in your Supabase SQL Editor:

```sql
-- Create prompt_analyses table
CREATE TABLE prompt_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    original_prompt TEXT NOT NULL,
    enhanced_prompt TEXT NOT NULL,
    score FLOAT NOT NULL,
    task_type TEXT NOT NULL,
    metrics JSONB NOT NULL,
    strengths JSONB NOT NULL,
    corrections JSONB NOT NULL,
    context TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_prompt_analyses_created_at ON prompt_analyses(created_at DESC);
```

### Step 4: Run the Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:

- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/docs
- **OpenAPI**: http://localhost:8000/openapi.json

## 🔑 Getting API Keys

### Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Click "Get API Key" or "Create API Key"
3. Create or select a project
4. Copy your API key

**Note:** Currently using `gemini-2.5-flash` model (latest stable version)

### Supabase Setup

1. Create an account at [Supabase](https://supabase.com)
2. Create a new project
3. Go to Settings → API
4. Copy:
   - Project URL → `SUPABASE_URL`
   - `anon` `public` key → `SUPABASE_KEY`
5. Run the SQL migration in SQL Editor

## 🧪 Testing the API

### Using cURL

```bash
# Analyze a prompt
curl -X POST http://localhost:8000/api/v1/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Write a blog post about AI",
    "task_type": "creative",
    "context": "For beginners"
  }'

# Get history
curl http://localhost:8000/api/v1/history?limit=5
```

### Using Python

```python
import requests

response = requests.post(
    "http://localhost:8000/api/v1/analyze",
    json={
        "prompt": "Explain quantum computing",
        "task_type": "educational"
    }
)
print(response.json())
```

## 📊 Task Types

- `creative` - Creative writing tasks
- `technical` - Technical documentation
- `analytical` - Data analysis prompts
- `general` - General purpose
- `educational` - Learning materials
- `business` - Business communications

## 🔒 CORS Configuration

The API allows requests from:

- http://localhost:5173 (Vite dev server)
- http://localhost:3000 (React dev server)

To add more origins, update `CORS_ORIGINS` in `.env`.

## 📝 Development

### Project Dependencies

- **FastAPI**: Modern web framework
- **Uvicorn**: ASGI server
- **Pydantic**: Data validation
- **Google Generative AI**: Gemini integration
- **Supabase**: Database client

### Code Style

- Follow PEP 8
- Use type hints
- Document functions with docstrings

## 🚨 Error Handling

The API returns standard HTTP status codes:

- `200`: Success
- `400`: Bad request
- `404`: Not found
- `500`: Server error

All errors include a JSON response with `detail` field.

## 📈 Future Enhancements

- Rate limiting
- User authentication
- Prompt templates
- Batch analysis
- Webhooks
- Analytics dashboard

## 📄 License

MIT
