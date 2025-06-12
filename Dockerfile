# 1. Base image with Node.js
FROM node:20

# 2. Set working directory inside the container
WORKDIR /app

# 3. Copy dependency files first
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of the project
COPY . .

# 6. Use env vars from host (e.g., PORT or DISCORD_TOKEN)
ENV NODE_ENV=production

# 7. Run your bot
CMD ["node", "index.js"]
