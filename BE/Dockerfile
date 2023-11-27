

# Stage 1: Build the Spring Boot application with Gradle
# Use an official Maven runtime as a builder image
FROM maven:latest as builder

# Set the working directory in the container
WORKDIR /app

# Copy Maven files
COPY pom.xml .
COPY src src

# Show the directory contents before running the build
RUN ls -al

# Run the build command with more detailed output
RUN mvn clean install

# Create a runtime image
FROM eclipse-temurin:17

# Set the working directory in the container
WORKDIR /app

# Copy the built JAR from the builder stage
COPY --from=builder /app/target/*.jar /app/app.jar

# Set the timezone to Asia/Ho_Chi_Minh
ENV TZ=Asia/Ho_Chi_Minh

# Update the timezone information
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Expose the port the app will run on
EXPOSE 8080

# Command to run the application
CMD ["java", "-jar", "app.jar"]
