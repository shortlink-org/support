# Use Node.js 18 Alpine as base image
FROM node:22-alpine AS base

# Set working directory
WORKDIR /usr/local/app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Development stage
FROM base AS dev

# Copy source code
COPY . .

# Expose port
EXPOSE 4111

# Start development server
CMD ["pnpm", "dev"]

# Build stage
FROM base AS build

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:22-alpine AS production

# Set working directory
WORKDIR /usr/local/app

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install pnpm and production dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod

# Copy built application from build stage
COPY --from=build /usr/local/app/dist ./dist

# Expose port
EXPOSE 4111

# Start production server
CMD ["pnpm", "start"] 