# Stage 1: Build Angular app
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies with pnpm
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build production app
RUN pnpm run build --configuration production

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built app from builder (Angular 21 outputs to browser/ subdirectory)
COPY --from=builder /app/dist/NotesAllSanity/browser /usr/share/nginx/html

# Copy nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
