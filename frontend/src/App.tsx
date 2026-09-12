import { useState } from 'react'
import { DollarSign, TrendingUp, Bot, CheckCircle2 } from 'lucide-react'

function App() {
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: 'Connect Telegram',
      description: 'Login with Telegram to get started',
      icon: Bot,
    },
    {
      title: 'Choose Your Goal',
      description: 'UGC, Affiliate, Freelance, or Micro-tasks',
      icon: Target,
    },
    {
      title: 'Install Platform',
      description: 'One-click installation on your device',
      icon: Download,
    },
    {
      title: 'AI Agent Activated',
      description: 'Your agent starts earning clicks automatically',
      icon: CheckCircle2,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-8 h-8 text-white" />
              <span className="text-xl font-bold text-white">Platform Play</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-white/80 hover:text-white transition">Features</a>
              <a href="#" className="text-white/80 hover:text-white transition">Pricing</a>
              <a href="#" className="text-white/80 hover:text-white transition">Academy</a>
            </nav>
            <button className="bg-white text-purple-900 px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/80 text-sm">AI-Powered Affiliate Platform</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Make Money with AI
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Without Technical Skills
            </span>
          </h1>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Install our app, connect Telegram, and let our AI agent automatically 
            find products, create content, and earn commissions from clicks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setStep(0)}
              className="bg-white text-purple-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 transition shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition border border-white/20">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-5xl mx-auto">
          {[
            { icon: DollarSign, label: 'Earned', value: '$2.4M' },
            { icon: TrendingUp, label: 'Active Users', value: '50K+' },
            { icon: Bot, label: 'AI Agents', value: '12K+' },
            { icon: CheckCircle2, label: 'Success Rate', value: '94%' },
          ].map((stat, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <stat.icon className="w-8 h-8 text-purple-400 mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Onboarding Steps */}
      {step > 0 && (
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto">
            {steps[step - 1] && (
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center">
                    <steps[step - 1].icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{steps[step - 1].title}</h3>
                    <p className="text-white/60">{steps[step - 1].description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setStep(Math.min(step + 1, steps.length))}
                  className="w-full bg-purple-500 text-white py-4 rounded-xl font-semibold hover:bg-purple-600 transition"
                >
                  {step === steps.length ? 'Complete' : 'Continue'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: '1. Connect Telegram',
              description: 'Login with your Telegram account — no password needed.',
            },
            {
              title: '2. Choose Your Path',
              description: 'UGC, Affiliate, Freelance, or Micro-tasks — we guide you.',
            },
            {
              title: '3. AI Agent Works',
              description: 'Our AI finds products, creates content, and earns commissions.',
            },
          ].map((feature, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-purple-400">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function Target() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
}

function Download() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
}

export default App
