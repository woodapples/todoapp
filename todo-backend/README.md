# 📝 Todo Backend API

Eine vollständige TODO-Management-API basierend auf **Quarkus 3.28.2** mit ## 🛠️ Development

### Code-First API Design

Dieses Projekt folgt dem **Code-First-Ansatz**:

1. Java-Code mit JAX-RS Annotationen schreiben
2. OpenAPI-Spezifikation wird automatisch generiert
3. Swagger UI zeigt live Dokumentation
4. Frontend kann TypeScript-Client generieren

### Beispiel: Neuen Endpoint hinzufügen

```java
@GET
@Path("/priority/{priority}")
@Operation(summary = "Get todos by priority")
public List<TodoResponseDTO> getTodosByPriority(@PathParam("priority") Priority priority) {
    return todoService.getTodosByPriority(priority);
}
```

→ Automatisch in OpenAPI und Swagger UI verfügbar!

### Testing

```bash
# Unit Tests
./mvnw test

# Integration Tests
./mvnw verify

# Mit TestContainers (empfohlen)
./mvnw test -Dquarkus.test.profile=test
```

## 📦 Production Deployment

### JAR Build

```bash
./mvnw package
java -jar target/quarkus-app/quarkus-run.jar
```

### Native Build (GraalVM)

```bash
./mvnw package -Dnative
./target/todo-backend-1.0.0-SNAPSHOT-runner
```

### Docker

```bash
# JVM Version
docker build -f src/main/docker/Dockerfile.jvm -t todo-backend:jvm .

# Native Version
docker build -f src/main/docker/Dockerfile.native -t todo-backend:native .
```

## 🔧 Konfiguration

### Development (`application.properties`)

```properties
# MongoDB
quarkus.mongodb.connection-string=mongodb://root:root@localhost:27017/todoapp?authSource=admin

# OpenAPI
quarkus.swagger-ui.always-include=true
quarkus.swagger-ui.path=/q/swagger-ui
```

### Production (Environment Variables)

```bash
QUARKUS_MONGODB_CONNECTION_STRING=mongodb://prod-server:27017/todoapp
QUARKUS_HTTP_PORT=8080
QUARKUS_LOG_LEVEL=INFO
```

## 🧪 API Testing

### cURL Beispiele

```bash
# Alle TODOs abrufen
curl http://localhost:8080/api/todos

# Neues TODO erstellen
curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test TODO","priority":"HIGH"}'

# TODO als erledigt markieren
curl -X PATCH http://localhost:8080/api/todos/{id}/complete
```

### Frontend Integration

```bash
# TypeScript Client generieren
curl http://localhost:8080/q/openapi > api-spec.json
npx @openapitools/openapi-generator-cli generate \
  -i api-spec.json \
  -g typescript-angular \
  -o frontend/src/app/api
```

## 📖 Dokumentation

- [API-First Workflow](API-FIRST.md)
- [Code-First Workflow](CODE-FIRST-WORKFLOW.md)
- [GitHub Repository Guide](GITHUB-GUIDE.md)

## 🤝 Contributing

1. Feature Branch erstellen: `git checkout -b feature/neue-funktion`
2. Änderungen committen: `git commit -m 'Add neue Funktion'`
3. Branch pushen: `git push origin feature/neue-funktion`
4. Pull Request erstellen

## 📄 License

Dieses Projekt steht unter der [MIT License](LICENSE).

---

**Powered by [Quarkus](https://quarkus.io/) - Supersonic Subatomic Java Framework** 🚀d **Enterprise-Architektur**.

![Quarkus](https://img.shields.io/badge/Quarkus-3.28.2-blue)
![Java](https://img.shields.io/badge/Java-21-orange)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)
![OpenAPI](https://img.shields.io/badge/OpenAPI-3.0-lightblue)

## 🎯 Features

✅ **Vollständige CRUD-Operationen** für TODOs  
✅ **MongoDB Panache** für einfache Datenbankoperationen  
✅ **Enterprise-Architektur** (Entity → Service → Resource → DTO → Mapper)  
✅ **OpenAPI 3.0** Dokumentation mit Swagger UI  
✅ **Bean Validation** für Input-Validierung  
✅ **Exception Handling** mit GlobalExceptionHandler  
✅ **Code-First API** Design  
✅ **Live Coding** mit Quarkus Dev Mode

## 🚀 Quick Start

## 🚀 Quick Start

### Voraussetzungen

- Java 21+
- Maven 3.8+
- MongoDB (Docker empfohlen)

### 1. MongoDB starten

```bash
# Mit Docker Compose (empfohlen)
docker run -d --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=root \
  mongo:latest
```

### 2. Anwendung starten

```bash
# Development Mode mit Live Coding
./mvnw quarkus:dev
```

### 3. API testen

- **Swagger UI**: http://localhost:8080/q/swagger-ui
- **OpenAPI Spec**: http://localhost:8080/q/openapi
- **Health Check**: http://localhost:8080/q/health
- **Dev UI**: http://localhost:8080/q/dev

## 📚 API Endpoints

| Method   | Endpoint                    | Beschreibung           |
| -------- | --------------------------- | ---------------------- |
| `GET`    | `/api/todos`                | Alle TODOs abrufen     |
| `GET`    | `/api/todos?completed=true` | Filter nach Status     |
| `GET`    | `/api/todos?priority=HIGH`  | Filter nach Priorität  |
| `POST`   | `/api/todos`                | Neues TODO erstellen   |
| `GET`    | `/api/todos/{id}`           | TODO by ID             |
| `PUT`    | `/api/todos/{id}`           | TODO aktualisieren     |
| `PATCH`  | `/api/todos/{id}/complete`  | Als erledigt markieren |
| `DELETE` | `/api/todos/{id}`           | TODO löschen           |
| `GET`    | `/api/todos/overdue`        | Überfällige TODOs      |
| `GET`    | `/api/todos/search?q=term`  | TODOs durchsuchen      |
| `GET`    | `/api/todos/tag/{tag}`      | TODOs nach Tag         |

## 🏗️ Architektur

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   REST Client   │───▶│   TodoResource   │───▶│   TodoService   │
│   (Frontend)    │    │   (Controller)   │    │ (Business Logic)│
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                         │
┌─────────────────┐    ┌──────────────────┐              │
│   TodoMapper    │◀───│     ToDo DTO     │◀─────────────┘
│  (Conversion)   │    │   (Data Transfer)│
└─────────────────┘    └──────────────────┘
         │
         ▼
┌─────────────────┐    ┌──────────────────┐
│   Todo Entity   │───▶│    MongoDB       │
│   (Domain)      │    │   (Database)     │
└─────────────────┘    └──────────────────┘
```

### Package-Struktur

```
com.github.woodapples.todoapp/
├── entity/          # Domain Models (Todo)
├── dto/             # Data Transfer Objects
├── mapper/          # Entity ↔ DTO Conversion
├── service/         # Business Logic
├── resource/        # REST Controllers
└── exception/       # Exception Handling
```

## Packaging and running the application

The application can be packaged using:

```shell script
./mvnw package
```

It produces the `quarkus-run.jar` file in the `target/quarkus-app/` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `target/quarkus-app/lib/` directory.

The application is now runnable using `java -jar target/quarkus-app/quarkus-run.jar`.

If you want to build an _über-jar_, execute the following command:

```shell script
./mvnw package -Dquarkus.package.jar.type=uber-jar
```

The application, packaged as an _über-jar_, is now runnable using `java -jar target/*-runner.jar`.

## Creating a native executable

You can create a native executable using:

```shell script
./mvnw package -Dnative
```

Or, if you don't have GraalVM installed, you can run the native executable build in a container using:

```shell script
./mvnw package -Dnative -Dquarkus.native.container-build=true
```

You can then execute your native executable with: `./target/todo-backend-1.0.0-SNAPSHOT-runner`

If you want to learn more about building native executables, please consult <https://quarkus.io/guides/maven-tooling>.

## Provided Code

### REST

Easily start your REST Web Services

[Related guide section...](https://quarkus.io/guides/getting-started-reactive#reactive-jax-rs-resources)
