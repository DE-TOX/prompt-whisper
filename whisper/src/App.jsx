import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import InputPanel from './components/InputPanel'
import OutputPanel from './components/OutputPanel'
import LandingPage from './components/LandingPage'
import Prism from './components/Prism'

function App() {
  const [currentView, setCurrentView] = useState('landing') // 'landing' or 'app'
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleGetStarted = () => {
    setCurrentView('app')
  }

  const handleBackToLanding = () => {
    setCurrentView('landing')
    setAnalysisResult(null)
    setIsAnalyzing(false)
  }

  const handleAnalyze = async (formData) => {
    // Client-side validation
    const trimmedPrompt = formData.prompt?.trim() || ''

    if (trimmedPrompt.length < 10) {
      toast.error('Prompt must be at least 10 characters long', {
        duration: 3000,
        style: {
          background: '#2B1A1A',
          color: '#FFF',
          border: '1px solid #EF4444',
        },
        iconTheme: {
          primary: '#EF4444',
          secondary: '#FFF',
        },
      })
      return
    }

    // Check for meaningful content (not just repeated words)
    const words = trimmedPrompt.split(/\s+/).filter(word => word.length > 0)
    const uniqueWords = new Set(words.map(w => w.toLowerCase()))

    if (uniqueWords.size < 3) {
      toast.error('Please provide a more meaningful prompt with at least 3 different words', {
        duration: 3000,
        style: {
          background: '#2B1A1A',
          color: '#FFF',
          border: '1px solid #EF4444',
        },
        iconTheme: {
          primary: '#EF4444',
          secondary: '#FFF',
        },
      })
      return
    }

    setIsAnalyzing(true)

    try {
      // Call FastAPI backend
      const response = await fetch('http://localhost:8000/api/v1/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: formData.prompt,
          task_type: formData.taskType,
          context: formData.context || null
        })
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle validation errors from backend
        if (response.status === 422 && data.detail) {
          const errors = Array.isArray(data.detail) ? data.detail : [data.detail]
          errors.forEach(error => {
            const fieldName = error.loc ? error.loc[error.loc.length - 1] : 'field'
            toast.error(`${fieldName}: ${error.msg}`, {
              duration: 4000,
              style: {
                background: '#2B1A1A',
                color: '#FFF',
                border: '1px solid #EF4444',
              },
              iconTheme: {
                primary: '#EF4444',
                secondary: '#FFF',
              },
            })
          })
          return
        }

        // Handle other API errors
        throw new Error(data.detail || `API error: ${response.status}`)
      }

      // Transform API response to match frontend format
      const result = {
        id: data.id,
        score: data.score,
        metrics: data.metrics,
        strengths: data.strengths,
        corrections: data.corrections,
        enhancedPrompt: data.enhanced_prompt
      }

      setAnalysisResult(result)

      // Success notification
      toast.success('Prompt analyzed successfully!', {
        duration: 2000,
        style: {
          background: '#1A2B1F',
          color: '#FFF',
          border: '1px solid #38A169',
        },
        iconTheme: {
          primary: '#38A169',
          secondary: '#FFF',
        },
      })

    } catch (error) {
      console.error('Error analyzing prompt:', error)

      toast.error(error.message || 'Failed to analyze prompt. Please try again.', {
        duration: 4000,
        style: {
          background: '#2B1A1A',
          color: '#FFF',
          border: '1px solid #EF4444',
        },
        iconTheme: {
          primary: '#EF4444',
          secondary: '#FFF',
        },
      })

    } finally {
      setIsAnalyzing(false)
    }
  }

  // Show landing page
  if (currentView === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />
  }

  // Show main app
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1A1A21',
            color: '#FFF',
            border: '1px solid #2A2A35',
          },
        }}
      />

      {/* Animated Prism Background - Fixed to viewport height */}
      <div className="fixed inset-0 z-0" style={{ height: '100vh' }}>
        <Prism
          animationType="rotate"
          timeScale={0.2}
          height={4.9}
          baseWidth={5.5}
          scale={2.5}
          hueShift={0.06}
          colorFrequency={1.8}
          glow={0.5}
          transparent={true}
          noise={0.0}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen text-white">
        {/* Header */}
        <header className="px-6 py-6 glass" style={{
          borderBottom: "1px solid var(--border-subtle)",
        }}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={handleBackToLanding}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              
              <h1
                className="text-2xl font-bold"
                style={{ color: "var(--pg-secondary)" }}
              >
                Prompt Whisper
              </h1>
            </button>
            <p
              className="text-sm hidden md:block"
              style={{ color: "var(--text-secondary)" }}
            >
              AI-Powered Prompt Enhancement & Analysis
            </p>
          </div>
        </header>

        {/* Main Content - Add background after header */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Input Panel */}
            <div className="lg:sticky lg:top-8 lg:h-fit animate-slideInLeft">
              <InputPanel onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            </div>

            {/* Output Panel */}
            <div className="lg:overflow-y-auto animate-slideInRight">
              <OutputPanel result={analysisResult} isAnalyzing={isAnalyzing} />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-4 mt-16 glass" style={{
          borderTop: "1px solid var(--border-subtle)",
        }}>
          <div
            className="max-w-7xl mx-auto text-center text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            <p>
              Learn more about{" "}
              <a
                href="#"
                className="hover:opacity-80 transition-colors"
                style={{ color: "var(--pg-primary)" }}
              >
                Prompt Engineering
              </a>{" "}
              | API usage disclaimer applies
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App
