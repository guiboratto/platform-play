# Platform Play — AI Affiliate Platform

🤖 **Make money with AI without technical skills**

Platform Play is a SaaS platform that teaches non-technical people to earn money through AI-powered affiliate marketing. Simply install the app, connect Telegram, and let our AI agent automatically find products, create content, and earn commissions.

## ✨ Features

- 🤖 **AI Agent** — Automatically finds products and creates content
- 💰 **Real-time Earnings** — Track your income 24/7
- 📊 **Dashboard** — Visual stats and progress
- 🎓 **Academy** — Bite-sized lessons to get started
- 🔗 **Telegram Integration** — Login with Telegram (no password)
- 📱 **Mobile-First** — Works on any device
- 🌍 **Multi-Platform** — Pinterest, Threads, TikTok, FB, IG

## 🚀 Quick Start

### Local Development

```bash
# Clone repository
git clone https://github.com/guiboratto/platform-play.git
cd platform-play

# Start services
docker-compose up -d

# Access frontend
open http://localhost:3000
```

See [QUICKSTART.md](QUICKSTART.md) for detailed instructions.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│           Platform Play SaaS Platform           │
│  ┌──────────────┐  ┌──────────────┐             │
│  │   Frontend   │  │   Backend    │             │
│  │  React + TS  │  │  FastAPI     │             │
│  └──────┬───────┘  └──────┬───────┘             │
└─────────┼──────────────────┼────────────────────┘
          │                  │
    ┌─────▼────────┐  ┌─────▼────────┐
    │   n8n        │  │  Telegram    │
    │  Workflows   │  │  Integration │
    └─────┬────────┘  └──────────────┘
          │
    ┌─────▼────────┐
    │  Social Media│
    │  Pinterest   │
    │  Threads     │
    │  TikTok      │
    └──────────────┘
```

## 📁 Project Structure

```
platform-play/
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── App.tsx       # Main application
│   │   ├── components/   # React components
│   │   ├── api.ts        # API client
│   │   └── main.tsx      # Entry point
│   ├── package.json
│   └── vite.config.ts
├── backend/               # FastAPI backend
│   ├── main.py           # Main application
│   ├── requirements.txt
│   └── public/           # Static files
├── n8n/                   # n8n workflows
│   └── platform-play-workflow.json
├── docs/                  # Documentation
│   ├── INTEGRATION.md    # Integration guide
│   ├── QUICKSTART.md     # Quick start guide
│   └── PROJECT_STATUS.md # Project status
└── docker-compose.yml     # Docker configuration
```

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Lucide React icons

**Backend:**
- FastAPI
- Python 3.11
- PostgreSQL
- Redis
- WebSocket

**Infrastructure:**
- Docker + Docker Compose
- n8n for automation
- Telegram Bot API
- Qwen AI API

## 📚 Documentation

- [QUICKSTART.md](QUICKSTART.md) — Get started in 5 minutes
- [INTEGRATION.md](INTEGRATION.md) — Integration with your ecosystem
- [PROJECT_STATUS.md](PROJECT_STATUS.md) — Current project status

## 🤖 How It Works

1. **Connect Telegram** — Login with Telegram (no password needed)
2. **Choose Your Path** — UGC, Affiliate, Freelance, or Micro-tasks
3. **Install Platform** — One-click installation on your device
4. **AI Agent Activates** — Automatically finds products and earns commissions

## 🔌 Integration Points

Platform Play integrates with your existing ecosystem:

- **qwen_affiliate_app** — TypeScript CLI for affiliate product search
- **n8n-workflows-repo** — Automation workflows for Pinterest, Threads, TikTok
- **ai-templates-mvp** — 50 AI templates for content creation

See [INTEGRATION.md](INTEGRATION.md) for details.

## 📊 Features Breakdown

### Frontend
- ✅ Hero section with value proposition
- ✅ Dashboard with real-time stats
- ✅ Agent status monitoring
- ✅ Transaction history
- ✅ Academy lessons
- ✅ Mobile-responsive design

### Backend
- ✅ REST API endpoints
- ✅ WebSocket support
- ✅ User management
- ✅ Agent management
- ✅ Transaction tracking
- ✅ Lesson system

### Telegram Integration
- ✅ Bot for user onboarding
- ✅ Goal selection
- ✅ Platform installation
- ✅ Status updates
- ✅ Earnings tracking

### n8n Workflow
- ✅ AI content generation
- ✅ Image prompt generation
- ✅ Pinterest pin creation
- ✅ Social media posting

## 🚧 Roadmap

### Phase 1: MVP ✅
- ✅ Frontend scaffold
- ✅ Backend scaffold
- ✅ Docker setup
- ✅ Telegram integration
- ✅ n8n workflow
- ✅ Dashboard

### Phase 2: Core Features ⏳
- ⏳ Real-time WebSocket updates
- ⏳ Payment integration (Stripe, Payoneer)
- ⏳ Academy lessons
- ⏳ Telegram Login Widget
- ⏳ Mobile app (React Native)

### Phase 3: Scale ⏳
- ⏳ Production deployment
- ⏳ Analytics
- ⏳ Advanced automation
- ⏳ Multi-language support
- ⏳ White-label option

## 📝 Environment Variables

```bash
# Required
TELEGRAM_BOT_TOKEN=your_bot_token
DATABASE_URL=postgresql://user:password@localhost:5432/platform_play
REDIS_URL=redis://localhost:6379/0
PLATFORM_PLAY_URL=http://localhost:3000

# Optional
QWEN_API_KEY=your_qwen_api_key
PINTEREST_API_KEY=your_pinterest_api_key
STRIPE_SECRET_KEY=your_stripe_key
PAYONEER_API_KEY=your_payoneer_key
```

## 🐳 Docker

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild
docker-compose up -d --build
```

## 🧪 Testing

```bash
# Test API endpoints
curl http://localhost:8000/api/user
curl http://localhost:8000/api/agent
curl http://localhost:8000/api/transactions

# View logs
docker-compose logs -f backend
```

## 📦 Deployment

See [INTEGRATION.md](INTEGRATION.md) for production deployment guide.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License — see LICENSE file for details

## 📞 Support

- 🐛 [GitHub Issues](https://github.com/guiboratto/platform-play/issues)
- 📧 [Email](support@platform-play.com)
- 📖 [Documentation](QUICKSTART.md)

## 🌟 Acknowledgments

- **Qwen AI** — For AI content generation
- **n8n** — For workflow automation
- **FastAPI** — For backend framework
- **React** — For frontend framework

---

**Made with ❤️ for non-technical people who want to earn money with AI**

**Status:** 🟢 Active Development
**Last Updated:** 2026-09-12
