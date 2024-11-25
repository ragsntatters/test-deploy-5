FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
# Build a runtime image
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY prisma/ prisma/
# Install dependencies
RUN npm install
# Expose port
EXPOSE 3001
# Start the application
CMD ["npm", "start"]
