import { useState } from 'react'
import { ChevronRight, Circle, Sparkles, Loader2 } from 'lucide-react'

const InputPanel = ({ onAnalyze, isAnalyzing }) => {
  const [formData, setFormData] = useState({
    taskType: 'general',
    persona: '',
    prompt: '',
    formatConstraint: ''
  })
  const [isExpanded, setIsExpanded] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  const taskTypes = [
    { id: 'coding', label: 'Coding' },
    { id: 'content', label: 'Content Writing' },
    { id: 'research', label: 'Research' },
    { id: 'creative', label: 'Creative' },
    { id: 'general', label: 'General' }
  ]

  const handlePromptChange = (e) => {
    const text = e.target.value
    setFormData({ ...formData, prompt: text })
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.prompt.trim()) return
    onAnalyze(formData)
  }

  const estimatedTokens = Math.ceil(wordCount * 1.3)

  return (
    <div
      className="rounded-xl p-6 space-y-6 shadow-2xl transition-all duration-300 glass"
      style={{
        boxShadow: 'var(--shadow-glass-dark)'
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Configuration */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            1. Target Configuration
          </h2>

          {/* Task Type Selector - Segmented Control */}
          <div className="space-y-2">
            <label className="block text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              LLM Objective
            </label>
            <div className="flex flex-wrap gap-2">
              {taskTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, taskType: type.id })}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105"
                  style={
                    formData.taskType === type.id
                      ? {
                          background: 'linear-gradient(135deg, var(--pg-primary), var(--pg-secondary))',
                          color: 'var(--text-primary)',
                          boxShadow: 'var(--shadow-glow)'
                        }
                      : {
                          backgroundColor: 'var(--surface)',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border-subtle)'
                        }
                  }
                  onMouseEnter={(e) => {
                    if (formData.taskType !== type.id) {
                      e.target.style.backgroundColor = 'var(--surface-hover)';
                      e.target.style.color = 'var(--text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (formData.taskType !== type.id) {
                      e.target.style.backgroundColor = 'var(--surface)';
                      e.target.style.color = 'var(--text-muted)';
                    }
                  }}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Context - Collapsible */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center text-sm transition-colors hover:opacity-80"
              style={{ color: '#999999' }}
            >
              <ChevronRight
                className={`w-4 h-4 mr-2 transition-transform ${
                  isExpanded ? 'rotate-90' : ''
                }`}
              />
              Advanced Context & Constraints (Optional)
            </button>

            {isExpanded && (
              <div className="mt-3 space-y-4 pl-6" style={{ borderLeft: '1px solid #2A2A35' }}>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#E0E0E0' }}>
                    Persona Assignment
                  </label>
                  <input
                    type="text"
                    value={formData.persona}
                    onChange={(e) => setFormData({ ...formData, persona: e.target.value })}
                    placeholder="e.g., 'Act as a senior Python developer'"
                    className="w-full px-3 py-2 rounded-md text-white transition-all duration-300"
                    style={{
                      backgroundColor: '#121217',
                      border: '1px solid #2A2A35',
                      color: '#E0E0E0'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#00D4FF';
                      e.target.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#2A2A35';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#E0E0E0' }}>
                    Format Constraint
                  </label>
                  <input
                    type="text"
                    value={formData.formatConstraint}
                    onChange={(e) => setFormData({ ...formData, formatConstraint: e.target.value })}
                    placeholder="e.g., 'JSON with 3 keys'"
                    className="w-full px-3 py-2 rounded-md text-white transition-all duration-300"
                    style={{
                      backgroundColor: '#121217',
                      border: '1px solid #2A2A35',
                      color: '#E0E0E0'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#00D4FF';
                      e.target.style.boxShadow = '0 0 10px rgba(0, 212, 255, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#2A2A35';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Prompt Input */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            2. Enter Your Base Prompt
          </h2>
          <div className="space-y-3">
            <div className="relative">
              <textarea
                value={formData.prompt}
                onChange={handlePromptChange}
                placeholder="Write a detailed prompt here. Remember to be clear and specific!"
                rows={8}
                className="w-full px-4 py-3 rounded-xl text-white resize-none transition-all duration-300"
                style={{
                  backgroundColor: '#121217',
                  border: '1px solid #2A2A35',
                  color: '#E0E0E0'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#00D4FF';
                  e.target.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#2A2A35';
                  e.target.style.boxShadow = 'none';
                }}
                required
              />
              <div className="absolute inset-0 rounded-xl pointer-events-none" style={{
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.02), rgba(147, 93, 255, 0.02))'
              }}></div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="flex items-center space-x-2">
                <Circle className="w-2 h-2 fill-current animate-pulse" style={{ color: '#00CC88' }} />
                <span style={{ color: '#999999' }}>Words: {wordCount} | Est. Tokens: {estimatedTokens}</span>
              </span>
              <span style={{ color: '#00CC88' }}>Draft saved locally</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={!formData.prompt.trim() || isAnalyzing}
          className="w-full py-4 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          style={
            !formData.prompt.trim() || isAnalyzing
              ? {
                  backgroundColor: '#2A2A35',
                  color: '#999999'
                }
              : {
                  background: 'linear-gradient(135deg, #00D4FF, #935DFF)',
                  color: '#FFFFFF',
                  boxShadow: '0 8px 25px rgba(0, 212, 255, 0.25)'
                }
          }
          onMouseEnter={(e) => {
            if (!(!formData.prompt.trim() || isAnalyzing)) {
              e.target.style.boxShadow = '0 12px 35px rgba(0, 212, 255, 0.35)';
            }
          }}
          onMouseLeave={(e) => {
            if (!(!formData.prompt.trim() || isAnalyzing)) {
              e.target.style.boxShadow = '0 8px 25px rgba(0, 212, 255, 0.25)';
            }
          }}
        >
          {isAnalyzing ? (
            <div className="flex items-center justify-center space-x-3">
              <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#999999' }} />
              <span>Analyzing...</span>
            </div>
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Analyze & Enhance Prompt</span>
            </span>
          )}
        </button>
      </form>
    </div>
  )
}

export default InputPanel