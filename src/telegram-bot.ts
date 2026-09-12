import { Telegraf } from 'telegraf'

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!)

// User state management
const userStates = new Map<number, any>()

// Commands
bot.start((ctx) => {
  const chatId = ctx.chat!.id
  userStates.set(chatId, { step: 0, goal: null })
  
  ctx.reply(
    `🤖 Welcome to Platform Play!\n\n` +
    `I'll help you start earning with AI.\n\n` +
    `1️⃣ Connect Telegram\n2️⃣ Choose Your Goal (UGC, Affiliate, Freelance, Micro-tasks)\n3️⃣ Install Platform\n4️⃣ AI Agent Activates\n\n` +
    `Click /start to begin!`
  )
})

bot.command('start', (ctx) => {
  const chatId = ctx.chat!.id
  
  ctx.reply(
    `🤖 Welcome to Platform Play!\n\n` +
    `Let's get you started:\n\n` +
    `1️⃣ **Connect Telegram**\n` +
    `Click the button below to login with Telegram\n\n` +
    `2️⃣ **Choose Your Goal**\n` +
    `Select: UGC | Affiliate | Freelance | Micro-tasks\n\n` +
    `3️⃣ **Install Platform**\n` +
    `One-click installation on your device\n\n` +
    `4️⃣ **AI Agent Activates**\n` +
    `Your agent starts earning clicks automatically!`
  )
})

bot.action('connect_telegram', async (ctx) => {
  const chatId = ctx.chat!.id
  
  // Redirect to platform-play.com/login with Telegram ID
  const loginUrl = `https://platform-play.com/login?telegram_id=${chatId}`
  await ctx.reply('Click here to login:', {
    reply_markup: {
      inline_keyboard: [[{ text: '🔐 Login with Telegram', url: loginUrl }]]
    }
  })
})

bot.action('choose_goal', async (ctx) => {
  const chatId = ctx.chat!.id
  userStates.set(chatId, { ...userStates.get(chatId)!, step: 1 })
  
  await ctx.reply(
    `🎯 Choose Your Path:\n\n` +
    `1️⃣ **UGC** — User Generated Content\n   Get paid for creating videos for US brands\n\n` +
    `2️⃣ **Affiliate** — Affiliate Marketing\n   Earn commissions from clicks and sales\n\n` +
    `3️⃣ **Freelance** — Remote Work\n   Write prompts, scripts, and content\n\n` +
    `4️⃣ **Micro-tasks** — Quick Tasks\n   Data labeling, surveys, simple tasks\n\n` +
    `Reply with 1, 2, 3, or 4`
  )
})

bot.on('text', async (ctx) => {
  const chatId = ctx.chat!.id
  const text = ctx.message.text.toLowerCase()
  const state = userStates.get(chatId)
  
  if (!state || state.step !== 1) return
  
  const goalMap = {
    '1': 'UGC',
    '2': 'Affiliate',
    '3': 'Freelance',
    '4': 'Micro-tasks'
  }
  
  const goal = goalMap[text]
  if (goal) {
    userStates.set(chatId, { ...state, step: 2, goal })
    
    await ctx.reply(
      `✅ Goal selected: ${goal}\n\n` +
      `📱 Install Platform:\n\n` +
      `Click the button below to install on your device\n\n` +
      `After installation, your AI agent will start working!`
    )
    
    const installUrl = `https://platform-play.com/install?telegram_id=${chatId}&goal=${goal}`
    await ctx.reply('Install Platform:', {
      reply_markup: {
        inline_keyboard: [[{ text: '📥 Install Platform', url: installUrl }]]
      }
    })
  } else {
    await ctx.reply('Please select a goal: 1, 2, 3, or 4')
  }
})

bot.command('status', async (ctx) => {
  const chatId = ctx.chat!.id
  const user = await getUserByTelegramId(chatId)
  
  if (!user) {
    await ctx.reply('Please login first using /start')
    return
  }
  
  const agent = await getAgentByUserId(user.id)
  
  await ctx.reply(
    `📊 Your Platform Play Status:\n\n` +
    `🎯 Goal: ${user.goal}\n` +
    `🤖 Agent: ${agent.status}\n` +
    `💰 Earned: $${agent.earnings.toFixed(2)}\n` +
    `📊 Clicks: ${agent.clicks}\n` +
    `📝 Posts Today: ${agent.posts_today}\n\n` +
    `Click /start to begin earning!`
  )
})

bot.command('earnings', async (ctx) => {
  const chatId = ctx.chat!.id
  const user = await getUserByTelegramId(chatId)
  
  if (!user) {
    await ctx.reply('Please login first using /start')
    return
  }
  
  const transactions = await getTransactionsByUserId(user.id)
  
  let message = `💰 Your Earnings:\n\n`
  transactions.forEach(tx => {
    message += `${tx.status === 'paid' ? '✅' : '⏳'} $${tx.amount.toFixed(2)} (${tx.source})\n`
  })
  
  await ctx.reply(message)
})

// Webhook endpoint (for production)
export async function handleWebhook(body: any) {
  await bot.handleUpdate(body)
}

// Start bot
if (process.env.NODE_ENV !== 'test') {
  bot.launch()
    .then(() => console.log('🤖 Telegram bot started'))
    .catch(err => console.error('🤖 Telegram bot error:', err))
}

// Graceful shutdown
process.on('SIGINT', () => bot.stop('SIGINT'))
process.on('SIGTERM', () => bot.stop('SIGTERM'))

export { bot }
