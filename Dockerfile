# syntax=docker/dockerfile:1

# ---------------------------
# Versions
# ---------------------------
ARG NODE_VERSION=20.17.0
ARG PNPM_VERSION=10.19.0

# ---------------------------
# 1️⃣ Base
# ---------------------------
FROM node:${NODE_VERSION}-slim AS base
WORKDIR /usr/src/app

# Installe pnpm proprement
RUN npm install -g pnpm@${PNPM_VERSION}

# ---------------------------
# 2️⃣ Dépendances
# ---------------------------
FROM base AS deps

# Copie les fichiers de dépendances
COPY package.json pnpm-lock.yaml ./

# Installe les deps (pas que prod ! sinon Tailwind manque)
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# ---------------------------
# 3️⃣ Build
# ---------------------------
FROM deps AS build

# Copie le code source
COPY . .

# Build Nuxt
RUN pnpm run build

# ---------------------------
# 4️⃣ Image finale (runtime)
# ---------------------------
FROM node:${NODE_VERSION}-slim AS final
WORKDIR /usr/src/app

ENV NODE_ENV=production
USER node

# Copie ce qui est nécessaire
COPY package.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]