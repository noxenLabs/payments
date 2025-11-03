FROM node:22.14-alpine AS base
WORKDIR /app

# 1. Instalar bash (necesario para algunos scripts de Corepack)
RUN apk add --no-cache bash

# 2. Instalar Corepack manualmente
RUN npm install -g corepack

# 3. Activar pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copiar archivos de bloqueo
COPY package.json pnpm-lock.yaml* tsconfig*.json ./

# ──────────────────────────────
FROM base AS build
RUN pnpm install --frozen-lockfile --ignore-scripts
COPY src ./src
RUN pnpm run build

# ──────────────────────────────
FROM base AS prod-deps
COPY --from=build /app/node_modules ./node_modules
RUN pnpm prune --prod

# ──────────────────────────────
FROM node:22.14-alpine AS production
WORKDIR /deploy 
ENV NODE_OPTIONS='--use-openssl-ca'
ENV TZ=America/Santiago

# Variables de entorno
ENV TYPE=ms
ENV ENV=local
ENV PORT=8091
ENV GLOBAL_PREFIX=/v1
ENV COMPONENT=example-ms:1.0.0
ENV JSON_PLACE_HOLDER_GET_URL=https://jsonplaceholder.typicode.com/posts/

# Configuración de tiempo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Copiar dependencias y build
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/src/shared/modules/scalar/favicon.ico /deploy/src/shared/modules/scalar/
COPY --from=build /app/src/shared/modules/scalar/flytheme.css /deploy/src/shared/modules/scalar/
COPY --from=build /app/dist /deploy/dist

# Usuario no root
RUN addgroup -S userDocker && adduser -S -G userDocker userDocker \
    && mkdir -p /app \
    && chown -R userDocker:userDocker /app
USER userDocker 

EXPOSE 8091
CMD ["node", "./dist/main"]