FROM openjdk:openjdk:21-ea-slim


WORKDIR /app


# Copia el archivo JAR de tu aplicación
COPY target/*.jar app.jar

EXPOSE 8000

# Ejecuta la aplicación en el puerto 8000
CMD ["java", "-jar", "app.jar", "--server.port=8000"]



# Dockerfile para el frontend
FROM nginx:alpine

COPY dist /usr/share/nginx/html

EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]

