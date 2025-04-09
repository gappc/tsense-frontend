ARG ALPINE_VERSION=3.21

FROM node:23-alpine${ALPINE_VERSION} AS builder

ENV LANGUAGE='en_US:en'

RUN mkdir -p /app && chown -R node:node /app
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY src/ ./src/
COPY public/ ./public/
COPY env* ./
COPY index.html ./
COPY tsconfig.* ./
COPY vite.config.* ./
RUN npm run build

# Production image
FROM joseluisq/static-web-server:2-alpine as build

COPY --from=builder /app/dist /public
