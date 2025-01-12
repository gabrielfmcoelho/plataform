# Stage 1: Build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy built files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
