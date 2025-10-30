# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.9.0
ARG PNPM_VERSION=10.19.0

################################################################################
# Base image
FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate

################################################################################
# Dependencies stage
FROM base AS deps

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

################################################################################
# Build stage
FROM deps AS build
COPY . .
RUN pnpm run build

################################################################################
# Runtime stage
FROM node:${NODE_VERSION}-alpine AS final
WORKDIR /usr/src/app

ENV NODE_ENV=production
USER node

COPY package.json ./
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]