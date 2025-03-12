# Stage 1: Build the Spring Boot App
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml ./
RUN mvn dependency:go-offline
COPY src/ ./src/
RUN mvn package -DskipTests

# Stage 2: Run the App with JDK 21 Alpine (lightweight)
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar musiclify-app.jar
EXPOSE 9090
ENTRYPOINT ["java", "-jar", "musiclify-app.jar"]