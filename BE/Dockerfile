# Sử dụng một hình ảnh cơ sở Java
FROM openjdk:17-jdk-alpine

# Tạo thư mục /app trong hệ thống tệp Docker và đặt nó làm thư mục làm việc mặc định
WORKDIR /app

# Expose cổng mạng cho ứng dụng Spring Boot (thay đổi số cổng cần thiết)
# khai báo rằng container sẽ lắng nghe kết nối đến cổng 8080
EXPOSE 8080
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
#RUN ./mvnw dependency:resolve
#
COPY src src
#
#CMD ["./mvnw", "spring-boot:run"]
# Sao chép tệp JAR của ứng dụng Spring Boot vào thư mục /app trong hệ thống tệp Docker
ADD target/spring-boot-docker.jar spring-boot-docker.jar

# Đặt biến môi trường SPRING_PROFILES_ACTIVE (nếu cần)
# ENV SPRING_PROFILES_ACTIVE=production



# Khởi chạy ứng dụng Spring Boot khi container được khởi động
ENTRYPOINT ["java", "-jar", "spring-boot-docker.jar"]
