# 🤖 NeuroCord - A Feature-Rich Discord Bot

**NeuroCord** is a powerful and engaging Discord bot built using **Node.js** and **Discord.js**. It comes packed with fun commands, AI integrations, reminders, polls, and more—all designed to enhance your server's interactivity and productivity.

🔗 [Add NeuroCord to your Discord server](https://discord.com/oauth2/authorize?client_id=1382058717402632354&permissions=8&integration_type=0&scope=bot+applications.commands)



## 🚀 Features

### 💬 Core Commands

- `/ping` – Check if the bot is alive  
- `/meme` – Fetch random memes from public APIs  
- `/trivia` – Play fun trivia games and track scores  
- `/remindme` – Set personalized reminders (MongoDB support planned)  
- `/ai-prompt` – Generate AI-powered responses using external AI APIs  
- `/gif`, `/dadjoke`, `/roastme`, `/fakequote` – Fun entertainment commands  



## ⚙️ Tech Stack

- **Node.js**  
- **Discord.js**  
- **Slash Commands** via Discord API  
- **External APIs** (AI, meme, joke, translation, etc.)  
- **Dockerized** for consistent deployment environments  



## 🐳 Docker Deployment

The bot is fully containerized using Docker and ready to deploy on any cloud infrastructure.

## 🔗 Docker Image Repository

- Docker Hub: [divilthakur/discordbot](https://hub.docker.com/repository/docker/divilthakur/discord-bot/general)

### 🛠️ Run via Docker

```bash
docker pull divilthakur/discordbot

docker run -d --name=discordbot --env-file .env divilthakur/discordbot
```

### 🔐 Environment Variables (.env file)
```
# Bot configurations
BOT_TOKEN=your_token_here
CLIENT_ID=your_client_id

# Bot activity
BOT_STATUS=online
ACTIVITY_TYPE=PLAYING
ACTIVITY_NAME=Discord

# API Keys
GROQ_API_KEY=your_ai_key
TENOR_API_KEY=your_tenor_key
FACTS_API_KEY=your_facts_key
```

## 🧑‍💻 Local Development
```# Clone the repo
git clone https://github.com/yourusername/discord-bot.git
cd discord-bot

# Install dependencies
npm install

# Start the bot
node index.js
```

## 🙋‍♂️ Author
Made with ❤️ by Divil Thakur
📧 Email: divilthkr3@gmail.com




