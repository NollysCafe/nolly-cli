# Base image
FROM node:latest

# Set working directory
WORKDIR /usr/src/app

# Copy only the package.json and pnpm-lock.yaml first (for efficient caching)
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the bot's source code
COPY . .

# Ensure up-to-date files during container rebuild
RUN pnpm install --frozen-lockfile

# Command to run your bot in development mode
CMD ["pnpm", "run", "dev"]
