# Platform Play — AI Affiliate Platform

AI-powered platform for non-technical users to earn money through affiliate marketing.

## Features

- 🤖 AI Agent that automatically finds products and creates content
- 💰 Real-time earnings tracking
- 📊 Dashboard with progress charts
- 🎓 Academy with bite-sized lessons
- 🔗 Telegram integration for easy access
- 📱 Mobile-responsive design

## Tech Stack

**Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
**Backend:** FastAPI + PostgreSQL + Redis
**Deployment:** Docker Compose

## Quick Start

### Local Development

```bash
# Clone the repository
git clone <repository-url>
cd platform-play

# Start services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
```

### Docker

```bash
docker-compose up -d --build
```

### Stop Services

```bash
docker-compose down
```

## Project Structure

```
platform-play/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── App.tsx   # Main application
│   │   ├── api.ts    # API client
│   │   └── main.tsx  # Entry point
│   ├── package.json
│   └── vite.config.ts
├── backend/           # FastAPI backend
│   ├── main.py       # Main application
│   └── requirements.txt
├── n8n/              # n8n workflows
├── docs/             # Documentation
└── docker-compose.yml
```

## How It Works

1. **Connect Telegram** — Login with Telegram (no password needed)
2. **Choose Your Path** — UGC, Affiliate, Freelance, or Micro-tasks
3. **Install Platform** — One-click installation on your device
4. **AI Agent Activates** — Automatically finds products and earns commissions

## Roadmap

- [x] Frontend scaffold
- [x] Backend scaffold
- [x] Docker setup
- [ ] Telegram Login Widget
- [ ] n8n workflow integration
- [ ] Real-time WebSocket updates
- [ ] Payment integration (Stripe, Payoneer, Deel)
- [ ] Mobile app (React Native)
- [ ] Advanced analytics

## License

MIT
