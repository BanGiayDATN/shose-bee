FROM maven:3.8.4-openjdk-17 as builder

WORKDIR /app

COPY pom.xml .
COPY src src

RUN mvn clean install

FROM adoptopenjdk:17-jre

WORKDIR /app

COPY --from=builder /app/target/*.jar /app/app.jar

ENV TZ=Asia/Ho_Chi_Minh

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
