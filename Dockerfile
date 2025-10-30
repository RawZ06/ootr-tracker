# syntax=docker/dockerfile:1

# ----- Étape 1 : build -----
FROM node:20.17.0-slim AS build

WORKDIR /app

# Installe pnpm
RUN npm install -g pnpm@10.19.0

# Copie les fichiers de dépendances
COPY package.json pnpm-lock.yaml ./

# Installe toutes les dépendances (dev + prod)
RUN pnpm install --frozen-lockfile

# Copie le code source
COPY . .

# Build Nuxt (génère .output/)
RUN pnpm run build

# ----- Étape 2 : runtime -----
FROM node:20.17.0-slim AS runtime

WORKDIR /app

ENV NODE_ENV=production
USER node

# Copie uniquement ce qui est utile en prod
COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]