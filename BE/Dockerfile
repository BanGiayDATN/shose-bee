# Use Maven as a build image
FROM maven:3.8.4-openjdk-17 as builder

WORKDIR /app

COPY pom.xml .
COPY src src

# Run the Maven build
RUN mvn clean install

# Use OpenJDK 17 as the runtime image
FROM eclipse-temurin:17

WORKDIR /app

# Copy the JAR file from the builder stage
COPY --from=builder /app/target/*.jar /app/app.jar

# Set the timezone to Asia/Ho_Chi_Minh
ENV TZ=Asia/Ho_Chi_Minh

# Update the timezone information
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Expose the port the app will run on
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]



