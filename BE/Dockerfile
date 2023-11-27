FROM maven:3.8-openjdk-17 as maven
WORKDIR /app
COPY ./pom.xml .
RUN mvn dependency:go-offline
COPY ./src ./src
RUN mvn package -DskipTests=true
WORKDIR /app/target/dependency
RUN jar -xf ../server-0.0.1-SNAPSHOT.jar

# Đặt múi giờ Việt Nam
ENV TZ=Asia/Ho_Chi_Minh

# Làm mới thông tin về múi giờ
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

FROM ibm-semeru-runtimes:open-17-jre-centos7
ARG DEPENDENCY=/app/target/dependency
COPY --from=maven ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=maven ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=maven ${DEPENDENCY}/BOOT-INF/classes /app
CMD java -server -Xmx1024m -Xss1024k -XX:MaxMetaspaceSize=135m -XX:CompressedClassSpaceSize=28m -XX:ReservedCodeCacheSize=13m -XX:+IdleTuningGcOnIdle -Xtune:virtualized -cp app:app/lib/* com.example.shose.server.ServerApplication