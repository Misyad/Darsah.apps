# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build || echo "No build script defined, skipping..."

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/data ./data
COPY --from=builder /app/dist ./dist 
# Note: If there's no build, copy src and use ts-node or similar, but for production, build is better.
COPY --from=builder /app/src ./src

EXPOSE 3000

CMD ["npm", "start"]
