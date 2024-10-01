# Dockerfile para el frontend
FROM nginx:alpine

COPY dist /usr/share/nginx/html

EXPOSE 8000  # O puedes usar EXPOSE 8000 si deseas mapearlo a 8000 en docker-compose

CMD ["nginx", "-g", "daemon off;"]