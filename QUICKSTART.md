# Platform Play — Quick Start Guide

Get started in 5 minutes!

## Prerequisites

- Docker and Docker Compose installed
- Telegram account
- Git

## Quick Setup (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/guiboratto/platform-play.git
cd platform-play
```

### 2. Create Environment File

```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```bash
TELEGRAM_BOT_TOKEN=your_bot_token_here
DATABASE_URL=postgresql://user:password@localhost:5432/platform_play
REDIS_URL=redis://localhost:6379/0
PLATFORM_PLAY_URL=http://localhost:3000
```

### 3. Start All Services

```bash
docker-compose up -d
```

This will start:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

### 4. Access the Application

Open your browser:
- **Frontend:** http://localhost:3000
- **Onboarding Page:** http://localhost:8000/
- **Dashboard:** http://localhost:3000/dashboard

### 5. Set Up Telegram Bot

1. Create bot on Telegram: @BotFather
2. Get bot token
3. Add token to `.env` file
4. Restart backend: `docker-compose restart backend`

### 6. Test the Application

1. Open http://localhost:3000
2. Click "Get Started Free"
3. Complete onboarding
4. Install Platform
5. Check dashboard for real-time stats

## Docker Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# View logs
docker-compose logs -f

# Rebuild and restart
docker-compose up -d --build

# Clean up all data
docker-compose down -v
```

## Testing API Endpoints

### Get User Info
```bash
curl http://localhost:8000/api/user
```

### Get Agent Status
```bash
curl http://localhost:8000/api/agent
```

### Get Transactions
```bash
curl http://localhost:8000/api/transactions
```

### Get Lessons
```bash
curl http://localhost:8000/api/lessons
```

## Import n8n Workflow

1. Open your n8n instance
2. Go to **Workflows** → **Import from File**
3. Upload `n8n/platform-play-workflow.json`
4. Configure credentials:
   - Qwen API
   - Pinterest API
   - Social Media APIs

## Set Up Telegram Bot

1. Create bot via @BotFather
2. Get bot token
3. Add to `.env`:
   ```bash
   TELEGRAM_BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
   ```
4. Restart backend:
   ```bash
   docker-compose restart backend
   ```

## Troubleshooting

### Frontend won't load
```bash
docker-compose logs frontend
```

### Backend won't start
```bash
docker-compose logs backend
```

### PostgreSQL connection error
- Check if PostgreSQL is running: `docker-compose ps postgres`
- Check logs: `docker-compose logs postgres`

### Redis connection error
- Check if Redis is running: `docker-compose ps redis`
- Check logs: `docker-compose logs redis`

## Next Steps

1. ✅ Run the app
2. ⏳ Configure n8n workflows
3. ⏳ Set up Telegram Bot
4. ⏳ Add payment integration
5. ⏳ Deploy to production

## Production Deployment

See `INTEGRATION.md` for production deployment guide.

## Need Help?

- GitHub Issues: https://github.com/guiboratto/platform-play/issues
- Documentation: See `INTEGRATION.md`
- Email: support@platform-play.com
