# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy bot source code
COPY . .

# Start the bot
CMD ["node", "index.js"]
