FROM openjdk:21-jdk-slim

WORKDIR /app

COPY target/employee-management-1.0-SNAPSHOT.jar /app/employee-management-1.0-SNAPSHOT.jar

EXPOSE 8080

CMD ["java" ,"-jar" ,"employee-management-1.0-SNAPSHOT.jar"]