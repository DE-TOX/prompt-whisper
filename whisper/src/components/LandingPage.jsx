import React from 'react';
import { ArrowRight, Sparkles, Target, CheckCircle, Zap, Brain, Lightbulb } from 'lucide-react';
import TextType from './TextType';
import Prism from './Prism';

const LandingPage = ({ onGetStarted }) => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze your prompts for clarity, context, and effectiveness"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Performance Scoring",
      description: "Get detailed scores with actionable insights to improve your prompt quality"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Smart Suggestions",
      description: "Receive intelligent recommendations to enhance your prompt structure"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Enhancement",
      description: "Transform your prompts into optimized, professional-grade instructions"
    }
  ];

  const benefits = [
    "Improve AI response quality by up to 10x",
    "Save time with automated prompt optimization",
    "Learn best practices from detailed analysis",
    "Perfect for developers, writers, and creators"
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
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
      <div className="relative z-10">
        {/* Hero Section - Full viewport height */}
        <section className="px-6 py-20 min-h-screen flex items-center">
          <div className="max-w-6xl mx-auto text-center w-full text-white">
            {/* Main Heading with Typing Effect */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span style={{ color: "#935DFF" }}>Prompt Whisper</span>
                </div>
              </h1>

              <div
                className="text-2xl md:text-4xl font-semibold min-h-[3rem] md:min-h-[4rem]"
                style={{ color: "#E0E0E0" }}
              >
                <TextType
                  text={[
                    "Transform your AI prompts",
                    "Boost response quality 10x",
                    "Master prompt engineering",
                    "Create perfect instructions",
                  ]}
                  typingSpeed={60}
                  pauseDuration={2000}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </div>
            </div>

            {/* Subtitle */}
            <p
              className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed"
              style={{ color: "#999999" }}
            >
              Harness the power of AI to analyze, enhance, and perfect your
              prompts. Get professional-grade results with intelligent insights
              and real-time optimization.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #00D4FF, #935DFF)",
                  color: "#FFFFFF",
                  boxShadow: "0 8px 25px rgba(0, 212, 255, 0.25)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow =
                    "0 12px 35px rgba(0, 212, 255, 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow =
                    "0 8px 25px rgba(0, 212, 255, 0.25)";
                }}
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  Start Enhancing Prompts
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                style={{
                  backgroundColor: "rgba(26, 26, 33, 0.8)",
                  color: "#999999",
                  border: "1px solid #2A2A35",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(42, 42, 53, 0.9)";
                  e.target.style.color = "#E0E0E0";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgba(26, 26, 33, 0.8)";
                  e.target.style.color = "#999999";
                }}
              >
                Watch Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div
              className="flex flex-wrap justify-center items-center gap-8 text-sm"
              style={{ color: "#999999" }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: "#00CC88" }} />
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: "#00CC88" }} />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: "#00CC88" }} />
                <span>Instant results</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Solid background after hero */}
        <section className="px-6 py-20" >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: "var(--pg-primary)" }}
              >
                Why Choose Prompt Whisper?
              </h2>
              <p
                className="text-xl max-w-3xl mx-auto"
                style={{ color: "var(--text-secondary)" }}
              >
                Our advanced AI technology provides comprehensive prompt
                analysis and enhancement tools
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group rounded-xl p-6 border transition-all duration-300 hover:transform hover:scale-105 glass"
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "var(--pg-secondary)";
                    e.target.style.backgroundColor = "var(--surface-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "var(--border-subtle)";
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{
                      background: "linear-gradient(135deg, var(--pg-secondary), var(--pg-primary))",
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3
                    className="text-xl font-semibold mb-3 transition-colors"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section - Solid background */}
        <section className="px-6 py-20" >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: "var(--pg-primary)" }}
              >
                Unlock Your AI Potential
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-xl border transition-all duration-300 glass"
                  style={{
                    border: "1px solid var(--positive)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "var(--pg-primary)";
                    e.target.style.backgroundColor = "var(--surface-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "var(--positive)";
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                    style={{
                      backgroundColor: "var(--positive)",
                    }}
                  >
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span
                    className="text-lg leading-relaxed"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Final CTA */}
            <div className="text-center mt-16">
              <button
                onClick={onGetStarted}
                className="group font-bold text-xl transition-all duration-300 transform hover:scale-105 px-10 py-5 rounded-xl"
                style={{
                  background: "linear-gradient(135deg, var(--pg-primary), var(--pg-secondary))",
                  color: "var(--text-primary)",
                  boxShadow: "var(--shadow-glow)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = "var(--shadow-glow-accent)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = "var(--shadow-glow)";
                }}
              >
                <span className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  Get Started Now - It's Free!
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Footer - Solid background */}
        <footer className="px-6 py-8" >
          <div
            className="max-w-6xl mx-auto text-center"
            style={{ color: "var(--text-secondary)" }}
          >
            <p>
              © 2025 Prompt Whisper. Elevating AI interactions through
              intelligent prompt optimization.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;