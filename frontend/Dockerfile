
FROM node:20-slim
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./
RUN npm install --legacy-peer-deps || yarn || true
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
