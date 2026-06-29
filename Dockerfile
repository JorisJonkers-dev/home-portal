# syntax=docker/dockerfile:1.7

FROM node:26-alpine AS build
# Node 25's alpine image dropped corepack from the base layer but still
# ships /usr/local/bin/yarn, which makes `npm install -g corepack` fail
# with EEXIST. Install pnpm directly at the packageManager version in
# package.json instead of going through corepack's shim dance.
RUN npm install -g pnpm@9.15.4
WORKDIR /app
COPY .npmrc package.json pnpm-lock.yaml ./
RUN --mount=type=secret,id=github_token \
    set -eu; \
    node_auth_token="$(cat /run/secrets/github_token)"; \
    printf '%s\n' '@jorisjonkers-dev:registry=https://npm.pkg.github.com' > ~/.npmrc; \
    printf '%s%s\n' '//npm.pkg.github.com/:_authToken=' "$node_auth_token" >> ~/.npmrc; \
    pnpm install --frozen-lockfile; \
    rm -f ~/.npmrc
COPY . .
ARG VITE_AUTH_URL=https://auth.jorisjonkers.dev
ARG VITE_FARO_URL=https://faro.jorisjonkers.dev/collect
RUN VITE_AUTH_URL=${VITE_AUTH_URL} \
    VITE_FARO_URL=${VITE_FARO_URL} \
    pnpm build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
