# Platform Play Integration Guide

## Overview

Platform Play is integrated with your existing ecosystem:

- **qwen_affiliate_app** — TypeScript CLI for affiliate product search and content generation
- **n8n-workflows-repo** — Automation workflows for Pinterest, Threads, TikTok
- **ai-templates-mvp** — 50 AI templates for content creation

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Platform Play SaaS                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Frontend    │  │  Backend     │  │  Telegram    │  │
│  │  React + TS  │  │  FastAPI     │  │  Bot         │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
└─────────┼──────────────────┼──────────────────┼─────────┘
          │                  │                  │
          │                  │                  │
    ┌─────▼────────┐  ┌─────▼────────┐  ┌─────▼────────┐
    │  n8n         │  │  qwen_cli    │  │  Telegram    │
    │  Workflows   │  │  Affiliate   │  │  Integration │
    └─────┬────────┘  └─────┬────────┘  └──────────────┘
          │                  │
          │                  │
    ┌─────▼────────┐  ┌─────▼────────┐
    │  Pinterest   │  │  Amazon      │
    │  Threads     │  │  Impact      │
    │  TikTok      │  │  ShareASale  │
    └──────────────┘  └──────────────┘
```

## Integration Points

### 1. Telegram Bot Integration

**File:** `src/telegram-bot.ts`

The Telegram bot handles:
- User onboarding
- Goal selection (UGC, Affiliate, Freelance, Micro-tasks)
- Platform installation links
- Real-time status updates
- Earnings tracking

**Setup:**
```bash
# Set environment variables
export TELEGRAM_BOT_TOKEN="your-bot-token"
export PLATFORM_PLAY_URL="https://platform-play.com"
```

### 2. n8n Workflow Integration

**File:** `n8n/platform-play-workflow.json`

The workflow handles:
- AI content generation using Qwen API
- Image prompt generation
- Pinterest pin creation
- Social media posting (Threads, TikTok)

**Import to n8n:**
1. Open your n8n instance
2. Go to Workflows → Import
3. Upload `n8n/platform-play-workflow.json`
4. Configure credentials (Qwen API, Pinterest API, Social Media APIs)

### 3. qwen_affiliate_app Integration

**File:** `src/affiliate-integration.ts`

The platform integrates with your existing qwen_affiliate_app CLI:

```typescript
import { AffiliateApp } from 'qwen-affiliate-app'

const affiliate = new AffiliateApp({
  apiKey: process.env.QWEN_API_KEY,
  goal: 'UGC', // or 'Affiliate', 'Freelance', 'Micro-tasks'
})

// Search products
const products = await affiliate.searchProducts({
  category: 'tech',
  platform: 'amazon',
  maxResults: 10
})

// Generate content
const content = await affiliate.generateContent({
  products: products,
  format: 'pin',
  language: 'ukrainian'
})
```

### 4. Database Integration

**PostgreSQL Schema:**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  username VARCHAR(100),
  goal VARCHAR(50) NOT NULL, -- UGC, Affiliate, Freelance, Micro-tasks
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE agents (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'paused', -- active, paused, error
  earnings DECIMAL(10,2) DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  posts_today INTEGER DEFAULT 0,
  last_active TIMESTAMP
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  source VARCHAR(100), -- Stripe, Payoneer, Deel, Crypto
  status VARCHAR(50) DEFAULT 'pending', -- pending, paid
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Deployment

### Local Development

```bash
# Clone repository
git clone https://github.com/guiboratto/platform-play.git
cd platform-play

# Set environment variables
cp .env.example .env
# Edit .env with your API keys

# Start services
docker-compose up -d

# Access
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# Telegram Bot: https://t.me/your_bot_name
```

### Production Deployment

```bash
# Build Docker images
docker-compose build

# Deploy to server
ssh your-server
cd platform-play
docker-compose up -d

# Setup SSL (Cloudflare Tunnel recommended)
cloudflared tunnel --url http://localhost:3000
```

## Environment Variables

```bash
# Required
TELEGRAM_BOT_TOKEN=your_bot_token
DATABASE_URL=postgresql://user:password@localhost:5432/platform_play
REDIS_URL=redis://localhost:6379/0
PLATFORM_PLAY_URL=https://platform-play.com

# Optional
QWEN_API_KEY=your_qwen_api_key
PINTEREST_API_KEY=your_pinterest_api_key
STRIPE_SECRET_KEY=your_stripe_key
PAYONEER_API_KEY=your_payoneer_key

# Node environment
NODE_ENV=production
```

## Next Steps

1. ✅ Scaffolded Platform Play (Frontend + Backend + Docker)
2. ✅ Created Telegram Bot integration
3. ✅ Created n8n workflow
4. ⏳ Configure n8n workflows
5. ⏳ Set up Telegram Bot
6. ⏳ Deploy to production
7. ⏳ Add Telegram Login Widget
8. ⏳ Integrate payment processing
9. ⏳ Create mobile app (React Native)

## Support

- GitHub: https://github.com/guiboratto/platform-play
- Issues: https://github.com/guiboratto/platform-play/issues
- Email: support@platform-play.com
