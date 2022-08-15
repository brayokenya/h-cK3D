FROM node:alpine AS builder
WORKDIR /mookh-agent
COPY . .
RUN npm install && npm run build
FROM nginx:alpine

COPY --from=builder /mookh-agent/dist/mookh-admin/* /usr/share/nginx/html/
