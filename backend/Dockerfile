#
# build image
#
FROM openjdk:11 as build

WORKDIR /app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

RUN chmod +x /app/mvnw

RUN ./mvnw dependency:go-offline -B

COPY src src

RUN ./mvnw package -DskipTests

#
# prod image
#
FROM openjdk:11-jre

LABEL maintainer="Anderson Marinho <anmdss@msn.com>"

COPY --from=build /app/target/aposentadoria-1.0.0.jar /usr/share/aposentadoria/aposentadoria-1.0.0.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/usr/share/aposentadoria/aposentadoria-1.0.0.jar"]
