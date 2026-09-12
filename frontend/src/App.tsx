import { useState } from 'react'
import { Bot, Home, Settings } from 'lucide-react'
import Dashboard from './components/Dashboard'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard'>('home')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              <Bot className="w-8 h-8 text-white" />
              <span className="text-xl font-bold text-white">Platform Play</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className="text-white/80 hover:text-white transition flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Dashboard
              </button>
              <button className="text-white/80 hover:text-white transition flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </nav>
            <button 
              onClick={() => setCurrentPage('dashboard')}
              className="bg-white text-purple-900 px-6 py-2 rounded-lg font-semibold hover:bg-white/90 transition"
            >
              Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Home Page */}
      {currentPage === 'home' && (
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
                onClick={() => setCurrentPage('dashboard')}
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
              { icon: Bot, label: 'Active Users', value: '50K+' },
              { icon: DollarSign, label: 'Total Earned', value: '$2.4M' },
              { icon: CheckCircle2, label: 'Success Rate', value: '94%' },
              { icon: TrendingUp, label: 'AI Agents', value: '12K+' },
            ].map((stat, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <stat.icon className="w-8 h-8 text-purple-400 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <section className="mt-32">
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
        </main>
      )}

      {/* Dashboard Page */}
      {currentPage === 'dashboard' && <Dashboard />}
    </div>
  )
}

function DollarSign() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
}

function TrendingUp() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
}

function CheckCircle2() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
}

export default App
