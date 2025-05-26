# Estágio de Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
# O script de build está definido no package.json como "tsc -b && vite build"
RUN npm run build

# Estágio de Produção (servindo com Nginx)
FROM nginx:1.27-alpine
# Copiar os arquivos estáticos construídos do estágio de build para o diretório padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Copiar uma configuração customizada do Nginx (opcional, mas bom para SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]