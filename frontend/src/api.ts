const API_BASE = '/api'

export interface User {
  id: string
  telegram_id: number
  username: string
  goal: 'UGC' | 'Affiliate' | 'Freelance' | 'Micro-tasks'
  created_at: string
}

export interface Agent {
  id: string
  user_id: string
  status: 'active' | 'paused' | 'error'
  earnings: number
  clicks: number
  posts_today: number
  last_active: string
}

export interface Transaction {
  id: string
  user_id: string
  amount: number
  currency: 'USD' | 'USDT'
  source: string
  status: 'pending' | 'paid'
  created_at: string
}

export interface Lesson {
  id: string
  title: string
  content: string
  duration: number
  order: number
}

export const api = {
  // User
  getUser: async (): Promise<User> => {
    const response = await fetch(`${API_BASE}/user`)
    if (!response.ok) throw new Error('Failed to fetch user')
    return response.json()
  },

  // Agent
  getAgent: async (): Promise<Agent> => {
    const response = await fetch(`${API_BASE}/agent`)
    if (!response.ok) throw new Error('Failed to fetch agent')
    return response.json()
  },

  startAgent: async (goal: string): Promise<Agent> => {
    const response = await fetch(`${API_BASE}/agent/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal }),
    })
    if (!response.ok) throw new Error('Failed to start agent')
    return response.json()
  },

  pauseAgent: async (): Promise<Agent> => {
    const response = await fetch(`${API_BASE}/agent/pause`, {
      method: 'POST',
    })
    if (!response.ok) throw new Error('Failed to pause agent')
    return response.json()
  },

  // Transactions
  getTransactions: async (limit = 10): Promise<Transaction[]> => {
    const response = await fetch(`${API_BASE}/transactions?limit=${limit}`)
    if (!response.ok) throw new Error('Failed to fetch transactions')
    return response.json()
  },

  // Lessons
  getLessons: async (): Promise<Lesson[]> => {
    const response = await fetch(`${API_BASE}/lessons`)
    if (!response.ok) throw new Error('Failed to fetch lessons')
    return response.json()
  },

  completeLesson: async (lessonId: string): Promise<void> => {
    const response = await fetch(`${API_BASE}/lessons/${lessonId}/complete`, {
      method: 'POST',
    })
    if (!response.ok) throw new Error('Failed to complete lesson')
  },
}
