FROM node:22-alpine
WORKDIR /app
COPY server.js ./
ARG APP_VERSION=dev
ENV APP_VERSION=$APP_VERSION PORT=3000 NODE_ENV=production
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:3000/health || exit 1
CMD ["node", "server.js"]
