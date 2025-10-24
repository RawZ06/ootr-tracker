# --------
# Étape 1 : Build du projet avec Vite
# --------
FROM node:20-alpine AS builder

# Répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires au build
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Installer les dépendances
RUN npm ci

# Copier le reste du projet
COPY . .

# Build de l’application
RUN npm run build


# --------
# Étape 2 : Serveur web léger avec NGINX
# --------
FROM nginx:stable-alpine

# Copier le build généré vers le répertoire de déploiement nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Supprimer la config par défaut et ajouter la tienne (SPA fallback)
RUN rm /etc/nginx/conf.d/default.conf

# Nouvelle configuration pour Vite SPA
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
  listen 80;
  server_name _;

  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files \$uri /index.html;
  }

  # Compression
  gzip on;
  gzip_types text/plain text/css application/javascript application/json image/svg+xml;
  gzip_min_length 256;
}
EOF

# Exposer le port 80
EXPOSE 80

# Lancer nginx
CMD ["nginx", "-g", "daemon off;"]