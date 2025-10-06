import { useState } from 'react'
import { Bot, Target, CheckCircle, AlertTriangle, Copy, Send, Circle } from 'lucide-react'
import toast from 'react-hot-toast'

const OutputPanel = ({ result, isAnalyzing }) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false)
  const [showLLMMenu, setShowLLMMenu] = useState(false)

  const handleCopyPrompt = async () => {
    if (result?.enhancedPrompt) {
      try {
        await navigator.clipboard.writeText(result.enhancedPrompt)
        setCopiedPrompt(true)
        setTimeout(() => setCopiedPrompt(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  const handleSendToLLM = async (platform) => {
    if (!result?.enhancedPrompt) return

    // Copy to clipboard first
    try {
      await navigator.clipboard.writeText(result.enhancedPrompt)

      // Open the selected LLM platform
      const urls = {
        chatgpt: 'https://chat.openai.com/',
        claude: 'https://claude.ai/new',
        gemini: 'https://gemini.google.com/',
        copilot: 'https://copilot.microsoft.com/'
      }

      const platformNames = {
        chatgpt: 'ChatGPT',
        claude: 'Claude',
        gemini: 'Gemini',
        copilot: 'Copilot'
      }

      if (urls[platform]) {
        window.open(urls[platform], '_blank')

        toast.success(`Copied prompt! Opening ${platformNames[platform]}...`, {
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
      }
    } catch (err) {
      console.error('Failed to copy:', err)
      toast.error('Failed to copy prompt to clipboard', {
        duration: 2000,
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
    }

    setShowLLMMenu(false)
  }

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-400'
    if (score >= 6) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreGradient = (score) => {
    if (score >= 8) return 'from-green-400 to-green-600'
    if (score >= 6) return 'from-yellow-400 to-yellow-600'
    return 'from-red-400 to-red-600'
  }

  const getScoreMessage = (score) => {
    if (score >= 9) return 'Highly optimized!'
    if (score >= 8) return 'Excellent foundation!'
    if (score >= 6) return 'Good structure, needs refinement'
    return 'Needs more context'
  }

  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <div className="space-y-6 animate-pulse">
      {/* Score Skeleton */}
      <div className="rounded-lg p-6" style={{ backgroundColor: '#1A1A21', border: '1px solid #2A2A35' }}>
        <div className="flex items-center justify-center">
          <div className="w-32 h-32 rounded-full" style={{ backgroundColor: '#2A2A35' }}></div>
        </div>
        <div className="flex justify-center space-x-4 mt-4">
          <div className="h-6 rounded w-20" style={{ backgroundColor: '#2A2A35' }}></div>
          <div className="h-6 rounded w-24" style={{ backgroundColor: '#2A2A35' }}></div>
          <div className="h-6 rounded w-20" style={{ backgroundColor: '#2A2A35' }}></div>
        </div>
      </div>

      {/* Feedback Skeleton */}
      <div className="rounded-lg p-6" style={{ backgroundColor: '#1A1A21', border: '1px solid #2A2A35' }}>
        <div className="h-6 rounded w-48 mb-4" style={{ backgroundColor: '#2A2A35' }}></div>
        <div className="space-y-3">
          <div className="h-4 rounded w-full" style={{ backgroundColor: '#2A2A35' }}></div>
          <div className="h-4 rounded w-3/4" style={{ backgroundColor: '#2A2A35' }}></div>
          <div className="h-4 rounded w-5/6" style={{ backgroundColor: '#2A2A35' }}></div>
        </div>
      </div>

      {/* Enhanced Prompt Skeleton */}
      <div className="rounded-lg p-6" style={{ backgroundColor: '#1A1A21', border: '1px solid #2A2A35' }}>
        <div className="h-6 rounded w-64 mb-4" style={{ backgroundColor: '#2A2A35' }}></div>
        <div className="space-y-2">
          <div className="h-4 rounded w-full" style={{ backgroundColor: '#2A2A35' }}></div>
          <div className="h-4 rounded w-full" style={{ backgroundColor: '#2A2A35' }}></div>
          <div className="h-4 rounded w-3/4" style={{ backgroundColor: '#2A2A35' }}></div>
          <div className="h-4 rounded w-full" style={{ backgroundColor: '#2A2A35' }}></div>
          <div className="h-4 rounded w-2/3" style={{ backgroundColor: '#2A2A35' }}></div>
        </div>
      </div>
    </div>
  )

  // Initial State
  if (!isAnalyzing && !result) {
    return (
      <div
        className="rounded-xl p-12 text-center"
        style={{
          backgroundColor: '#1A1A21',
          border: '1px solid #2A2A35',
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)'
        }}
      >
        <div className="animate-pulse">
          <Bot className="w-16 h-16 mx-auto mb-6 animate-float" style={{ color: '#935DFF' }} />
          <div className="text-xl mb-4" style={{ color: '#E0E0E0' }}>
            Your prompt analysis will appear here...
          </div>
          <p style={{ color: '#999999' }}>
            Configure your task and enter a prompt to get started
          </p>
        </div>
      </div>
    )
  }

  // Loading State
  if (isAnalyzing) {
    return (
      <div className="animate-fadeIn">
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center space-x-3 px-6 py-3 rounded-lg"
            style={{
              backgroundColor: '#1A1A21',
              border: '1px solid #2A2A35',
              boxShadow: '0 0 10px rgba(0, 212, 255, 0.1)'
            }}
          >
            <Circle className="w-4 h-4 rounded-full animate-pulse" style={{ color: '#00D4FF' }} />
            <p className="text-lg" style={{ color: '#E0E0E0' }}>Analyzing prompt...</p>
          </div>
          <p className="text-sm mt-3" style={{ color: '#999999' }}>Please wait (20-30 seconds)</p>
        </div>
        <SkeletonLoader />
      </div>
    )
  }

  // Results State
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Prompt Performance Score */}
      <div
        className="rounded-xl p-8 transition-all duration-500"
        style={{
          backgroundColor: '#1A1A21',
          border: '1px solid #2A2A35',
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)'
        }}
      >
        <h2 className="text-xl font-semibold mb-8 text-center flex items-center justify-center gap-3" style={{ color: '#00D4FF' }}>
          <Target className="w-6 h-6" />
          Prompt Performance Score
        </h2>

        {/* Gauge Display */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-gray-600"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(result.score / 10) * 283} 283`}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop
                    offset="0%"
                    className={`${getScoreGradient(result.score).split(' ')[0].replace('from-', 'text-')}`}
                    stopColor="currentColor"
                  />
                  <stop
                    offset="100%"
                    className={`${getScoreGradient(result.score).split(' ')[1].replace('to-', 'text-')}`}
                    stopColor="currentColor"
                  />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                {result.score}
              </span>
            </div>
          </div>

          <p style={{ color: '#999999' }} className="mt-2 text-center">
            {getScoreMessage(result.score)}
          </p>

          {/* Metrics Chips */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {Object.entries(result.metrics).map(([key, value]) => (
              <span
                key={key}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  value === 'High'
                    ? 'bg-green-900 text-green-300'
                    : value === 'Medium'
                    ? 'bg-yellow-900 text-yellow-300'
                    : 'bg-red-900 text-red-300'
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Structured Analysis */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold" style={{ color: '#E0E0E0' }}>3. Structured Analysis</h2>

        {/* Strengths */}
        <div
          className="rounded-xl p-6 transition-all duration-300"
          style={{
            backgroundColor: '#1A2B1F',
            border: '1px solid #38A169',
            borderLeft: '4px solid #38A169'
          }}
        >
          <h3 className="font-medium mb-4 flex items-center text-lg" style={{ color: '#38A169' }}>
            <div
              className="w-6 h-6 mr-3 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#38A169' }}
            >
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            Strengths & Best Practices Used
          </h3>
          <ul className="space-y-3">
            {result.strengths.map((strength, index) => (
              <li key={index} className="flex items-start transition-colors duration-200" style={{ color: '#E0E0E0' }}>
                <div
                  className="w-5 h-5 mr-3 mt-0.5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#38A169' }}
                >
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <span className="leading-relaxed">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Corrections */}
        <div
          className="rounded-xl p-6 transition-all duration-300"
          style={{
            backgroundColor: '#2B2A1A',
            border: '1px solid #ECC94B',
            borderLeft: '4px solid #ECC94B'
          }}
        >
          <h3 className="font-medium mb-4 flex items-center text-lg" style={{ color: '#B7791F' }}>
            <div
              className="w-6 h-6 mr-3 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#ECC94B' }}
            >
              <AlertTriangle className="w-4 h-4" style={{ color: '#B7791F' }} />
            </div>
            Actionable Corrections & Missing Details
          </h3>
          <ul className="space-y-3">
            {result.corrections.map((correction, index) => (
              <li key={index} className="flex items-start justify-between transition-colors duration-200" style={{ color: '#E0E0E0' }}>
                <div className="flex items-start">
                  <div
                    className="w-5 h-5 mr-3 mt-0.5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#ECC94B' }}
                  >
                    <AlertTriangle className="w-3 h-3" style={{ color: '#B7791F' }} />
                  </div>
                  <span className="leading-relaxed">{correction}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Enhanced Prompt */}
      <div
        className="rounded-xl p-6"
        style={{
          backgroundColor: '#1A1A21',
          border: '1px solid #2A2A35',
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)'
        }}
      >
        <h2 className="text-xl font-semibold mb-6" style={{ color: '#E0E0E0' }}>4. Enhanced & Optimized Prompt</h2>

        <div
          className="rounded-lg p-4 font-mono text-sm whitespace-pre-wrap mb-6 max-h-96 overflow-y-auto"
          style={{
            backgroundColor: '#121217',
            border: '1px solid #2A2A35',
            color: '#00CC88'
          }}
        >
          {result.enhancedPrompt}
        </div>

        <div className="flex gap-3 relative">
          <button
            onClick={handleCopyPrompt}
            className="flex items-center px-4 py-3 rounded-lg transition-colors font-medium"
            style={{
              backgroundColor: '#00D4FF',
              color: '#FFFFFF'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#00A8CC';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#00D4FF';
            }}
          >
            <Copy className="w-4 h-4 mr-2" />
            {copiedPrompt ? 'Copied!' : 'Copy to Clipboard'}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowLLMMenu(!showLLMMenu)}
              className="flex items-center px-4 py-3 rounded-lg transition-colors font-medium"
              style={{
                backgroundColor: '#121217',
                color: '#999999',
                border: '1px solid #2A2A35'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#1A1A21';
                e.target.style.color = '#E0E0E0';
                e.target.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#121217';
                e.target.style.color = '#999999';
                e.target.style.boxShadow = 'none';
              }}
            >
              <Send className="w-4 h-4 mr-2" />
              Send to LLM
            </button>

            {showLLMMenu && (
              <div
                className="absolute bottom-full mb-2 right-0 rounded-lg overflow-hidden shadow-lg z-10 min-w-[180px]"
                style={{
                  backgroundColor: '#1A1A21',
                  border: '1px solid #2A2A35',
                  boxShadow: '0 0 20px rgba(0, 212, 255, 0.2)'
                }}
              >
                {[
                  { id: 'chatgpt', name: 'ChatGPT', color: '#10A37F' },
                  { id: 'claude', name: 'Claude', color: '#D97757' },
                  { id: 'gemini', name: 'Gemini', color: '#4285F4' },
                  { id: 'copilot', name: 'Copilot', color: '#0078D4' }
                ].map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => handleSendToLLM(platform.id)}
                    className="w-full text-left px-4 py-3 transition-colors flex items-center gap-2"
                    style={{ color: '#E0E0E0' }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#2A2A35';
                      e.target.style.color = platform.color;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#E0E0E0';
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: platform.color }}
                    />
                    {platform.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OutputPanel