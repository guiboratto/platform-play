import { useState, useEffect } from 'react'
import { DollarSign, TrendingUp, Bot, CheckCircle2, Clock, Calendar } from 'lucide-react'
import { api } from '../api'

interface Agent {
  id: string
  status: 'active' | 'paused' | 'error'
  earnings: number
  clicks: number
  posts_today: number
  last_active: string
}

interface Transaction {
  id: string
  amount: number
  currency: 'USD' | 'USDT'
  source: string
  status: 'pending' | 'paid'
  created_at: string
}

function Dashboard() {
  const [agent, setAgent] = useState<Agent | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchData = async () => {
    try {
      const [agentData, txData] = await Promise.all([
        api.getAgent(),
        api.getTransactions(10),
      ])
      setAgent(agentData)
      setTransactions(txData)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/10'
      case 'paused':
        return 'text-yellow-400 bg-yellow-400/10'
      case 'error':
        return 'text-red-400 bg-red-400/10'
      default:
        return 'text-gray-400 bg-gray-400/10'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-8 h-8 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">Platform Play</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {agent?.status === 'active' ? '🟢 Active' : '⏸️ Paused'}
              </span>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
                Settings
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-3 border-purple-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  icon: DollarSign,
                  label: 'Total Earned',
                  value: `$${agent?.earnings.toFixed(2) || '0.00'}`,
                  color: 'text-green-600',
                  bgColor: 'bg-green-50',
                },
                {
                  icon: TrendingUp,
                  label: 'Total Clicks',
                  value: agent?.clicks?.toLocaleString() || '0',
                  color: 'text-blue-600',
                  bgColor: 'bg-blue-50',
                },
                {
                  icon: Bot,
                  label: 'Posts Today',
                  value: agent?.posts_today?.toLocaleString() || '0',
                  color: 'text-purple-600',
                  bgColor: 'bg-purple-50',
                },
                {
                  icon: CheckCircle2,
                  label: 'Success Rate',
                  value: '94%',
                  color: 'text-emerald-600',
                  bgColor: 'bg-emerald-50',
                },
              ].map((stat, index) => (
                <div key={index} className={`${stat.bgColor} rounded-2xl p-6 border border-gray-100`}>
                  <stat.icon className={`w-8 h-8 ${stat.color} mb-4`} />
                  <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Agent Status */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">AI Agent Status</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(agent?.status || 'paused')}`}>
                    {agent?.status || 'paused'}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="text-sm text-gray-600">Last Active</div>
                        <div className="font-medium text-gray-900">
                          {agent?.last_active
                            ? new Date(agent.last_active).toLocaleString()
                            : 'Never'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="text-sm text-gray-600">Posts Today</div>
                        <div className="font-medium text-gray-900">
                          {agent?.posts_today || 0}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-gray-600" />
                      <div>
                        <div className="text-sm text-gray-600">Today's Earnings</div>
                        <div className="font-medium text-gray-900">
                          ${agent?.earnings?.toFixed(2) || '0.00'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-medium hover:bg-purple-700 transition">
                    Start Agent
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition">
                    Pause Agent
                  </button>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Transactions</h2>

                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-medium text-gray-900">{tx.source}</div>
                        <div className="text-sm text-gray-600">
                          {new Date(tx.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className={`text-right`}>
                        <div className={`font-bold ${tx.status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                          ${tx.amount.toFixed(2)}
                        </div>
                        <div className={`text-xs ${tx.status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {tx.status}
                        </div>
                      </div>
                    </div>
                  ))}

                  {transactions.length === 0 && (
                    <div className="text-center py-8 text-gray-600">
                      No transactions yet
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default Dashboard
