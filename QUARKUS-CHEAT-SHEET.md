# 🚀 Quarkus Cheat Sheet für Einsteiger

**Quarkus** = "Supersonic Subatomic Java Framework" - Schnell, klein, container-ready!

## 📋 **Quick Start Commands**

### **Projekt erstellen**

```bash
# Neues Projekt mit Code Generator
mvn io.quarkus.platform:quarkus-maven-plugin:3.28.2:create \
    -DprojectGroupId=com.example \
    -DprojectArtifactId=my-app \
    -DclassName="com.example.GreetingResource" \
    -Dpath="/hello"

# Mit Quarkus CLI (nach Installation)
quarkus create app com.example:my-app
```

### **Wichtigste Commands**

```bash
./mvnw quarkus:dev          # 🔥 Development Mode (Live Reload!)
./mvnw test                 # Tests ausführen
./mvnw package              # JAR bauen
./mvnw package -Dnative     # Native Binary (GraalVM)
./mvnw quarkus:add-extension -Dextensions="hibernate-orm,jdbc-postgresql"
```

---

## 🛠️ **Essential Annotations**

### **REST Endpoints**

```java
@Path("/api/todos")                    // Base URL
@GET                                   // HTTP GET
@POST                                  // HTTP POST
@PUT @DELETE @PATCH                    // Weitere HTTP Verben
@Path("/{id}")                         // URL Parameter
@PathParam("id") String id             // Parameter aus URL
@QueryParam("status") String status    // ?status=completed
@Produces(MediaType.APPLICATION_JSON)  // Response Format
@Consumes(MediaType.APPLICATION_JSON)  // Request Format
```

### **Dependency Injection**

```java
@Inject                               // Bean injizieren
@ApplicationScoped                    // Singleton für App
@RequestScoped                        // Pro HTTP Request
@Singleton                           // Eager Singleton
@Named("myBean")                     // Bean benennen
```

### **Configuration**

```java
@ConfigProperty(name = "myapp.timeout")
int timeout;

@ConfigProperty(name = "myapp.name", defaultValue = "MyApp")
String appName;
```

### **Database (Panache)**

```java
@Entity                              // JPA Entity
public class Todo extends PanacheEntity {
    public String title;             // Public fields (Panache Magic!)

    // Custom queries
    public static List<Todo> findByCompleted(boolean completed) {
        return find("completed", completed).list();
    }
}
```

---

## 📦 **Wichtigste Extensions**

### **Installation**

```bash
./mvnw quarkus:add-extension -Dextensions="EXTENSION_NAME"
```

### **Häufig genutzte Extensions**

```bash
# REST & Web
resteasy-reactive              # REST Endpoints
rest-jackson                   # JSON Serialization
smallrye-openapi              # OpenAPI/Swagger
hibernate-validator           # Bean Validation

# Datenbank
hibernate-orm-panache         # JPA mit Panache
mongodb-panache              # MongoDB mit Panache
jdbc-postgresql              # PostgreSQL Driver
jdbc-mysql                   # MySQL Driver

# Security
security-jpa                 # Database Security
oidc                         # OpenID Connect
jwt                          # JWT Token

# Messaging
smallrye-reactive-messaging  # Reactive Messaging
kafka                        # Apache Kafka
amqp                         # AMQP/RabbitMQ

# Monitoring
micrometer                   # Metrics
health                       # Health Checks
fault-tolerance              # Circuit Breaker

# Testing
junit5                       # JUnit 5
test-h2                      # H2 für Tests
testcontainers              # Integration Tests
```

---

## 🏗️ **Projekt-Struktur**

```
src/
├── main/
│   ├── java/
│   │   └── com/example/
│   │       ├── entity/          # Domain Models
│   │       ├── repository/      # Data Access
│   │       ├── service/         # Business Logic
│   │       ├── resource/        # REST Controllers
│   │       └── dto/             # Data Transfer Objects
│   ├── resources/
│   │   ├── application.properties    # Configuration
│   │   ├── META-INF/
│   │   └── static/              # Static Files
│   └── docker/
│       └── Dockerfile.jvm       # Docker Images
└── test/
    └── java/                    # Tests
```

---

## ⚙️ **Configuration (application.properties)**

### **Basics**

```properties
# Server
quarkus.http.port=8080
quarkus.http.host=0.0.0.0

# Database
quarkus.datasource.db-kind=postgresql
quarkus.datasource.username=myuser
quarkus.datasource.password=mypass
quarkus.datasource.jdbc.url=jdbc:postgresql://localhost/mydb

# MongoDB
quarkus.mongodb.connection-string=mongodb://localhost:27017/mydb

# Development
quarkus.log.level=INFO
quarkus.log.category."com.example".level=DEBUG
quarkus.live-reload.instrumentation=true
```

### **OpenAPI/Swagger**

```properties
quarkus.swagger-ui.always-include=true
quarkus.swagger-ui.path=/q/swagger-ui
mp.openapi.extensions.smallrye.info.title=My API
mp.openapi.extensions.smallrye.info.version=1.0.0
```

### **Environment-specific**

```properties
# application-dev.properties
%dev.quarkus.datasource.jdbc.url=jdbc:h2:mem:testdb

# application-prod.properties
%prod.quarkus.datasource.jdbc.url=jdbc:postgresql://prod-server/mydb
```

---

## 🔥 **Development Mode Features**

### **Live Reload**

```bash
./mvnw quarkus:dev
# Änderungen werden automatisch geladen!
# Kein Neustart nötig 🎉
```

### **Dev UI**

```
http://localhost:8080/q/dev/
```

- Extension Manager
- Database Explorer
- Configuration Editor
- Testing Tools

### **Useful URLs**

```
http://localhost:8080/q/health     # Health Checks
http://localhost:8080/q/metrics    # Prometheus Metrics
http://localhost:8080/q/openapi    # OpenAPI Spec
http://localhost:8080/q/swagger-ui # Swagger UI
```

---

## 📊 **Database mit Panache**

### **Active Record Pattern**

```java
@Entity
public class Todo extends PanacheEntity {
    public String title;
    public boolean completed = false;

    // CRUD ist automatisch da!
    // todo.persist() ✅
    // Todo.findById(1L) ✅
    // Todo.listAll() ✅
    // todo.delete() ✅
}

// Usage
Todo todo = new Todo();
todo.title = "Learn Quarkus";
todo.persist();                    // Save

List<Todo> todos = Todo.listAll(); // Find all
Todo todo = Todo.findById(1L);     // Find by ID
todo.delete();                     // Delete
```

### **Repository Pattern**

```java
@ApplicationScoped
public class TodoRepository implements PanacheRepository<Todo> {

    public List<Todo> findByCompleted(boolean completed) {
        return find("completed", completed).list();
    }

    public List<Todo> findByTitle(String title) {
        return find("title like ?1", "%" + title + "%").list();
    }
}
```

### **Queries**

```java
// Simple Queries
Todo.find("title", "Learn Quarkus").firstResult();
Todo.find("completed = true").list();

// Parameters
Todo.find("title = ?1 and completed = ?2", "Test", false).list();

// Named Parameters
Todo.find("title = :title", Parameters.with("title", "Test")).list();

// Sorting
Todo.find("completed", Sort.by("title")).list();

// Paging
Todo.find("completed", Sort.by("title"))
    .page(0, 10)  // Page 0, 10 items
    .list();
```

---

## 🌐 **REST APIs**

### **Basic REST Controller**

```java
@Path("/api/todos")
@ApplicationScoped
public class TodoResource {

    @Inject
    TodoService service;

    @GET
    public List<TodoDTO> getAll() {
        return service.findAll();
    }

    @GET
    @Path("/{id}")
    public TodoDTO getById(@PathParam("id") Long id) {
        return service.findById(id);
    }

    @POST
    public Response create(@Valid TodoCreateDTO dto) {
        TodoDTO created = service.create(dto);
        return Response.status(201).entity(created).build();
    }

    @PUT
    @Path("/{id}")
    public TodoDTO update(@PathParam("id") Long id, @Valid TodoUpdateDTO dto) {
        return service.update(id, dto);
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id) {
        service.delete(id);
        return Response.noContent().build();
    }
}
```

### **Query Parameters & Validation**

```java
@GET
public List<TodoDTO> getTodos(
    @QueryParam("completed") Boolean completed,
    @QueryParam("page") @DefaultValue("0") int page,
    @QueryParam("size") @DefaultValue("10") @Min(1) @Max(100) int size) {

    return service.findTodos(completed, page, size);
}
```

### **OpenAPI Documentation**

```java
@GET
@Operation(summary = "Get all todos", description = "Retrieve all todo items")
@APIResponse(responseCode = "200", description = "Success",
    content = @Content(schema = @Schema(implementation = TodoDTO.class)))
public List<TodoDTO> getAll() {
    return service.findAll();
}
```

---

## ✅ **Testing**

### **Unit Tests**

```java
@QuarkusTest
class TodoResourceTest {

    @Test
    void testGetAllTodos() {
        given()
            .when().get("/api/todos")
            .then()
            .statusCode(200)
            .body("size()", greaterThan(0));
    }

    @Test
    void testCreateTodo() {
        TodoCreateDTO dto = new TodoCreateDTO();
        dto.title = "Test Todo";

        given()
            .contentType(ContentType.JSON)
            .body(dto)
            .when().post("/api/todos")
            .then()
            .statusCode(201)
            .body("title", equalTo("Test Todo"));
    }
}
```

### **Test Resources**

```properties
# application-test.properties
quarkus.datasource.db-kind=h2
quarkus.datasource.jdbc.url=jdbc:h2:mem:testdb
quarkus.hibernate-orm.database.generation=drop-and-create
```

### **TestContainers**

```java
@QuarkusTest
@TestProfile(DatabaseTestProfile.class)
class TodoServiceIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:13")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");

    // Tests hier...
}
```

---

## 🐳 **Deployment**

### **JAR Deployment**

```bash
./mvnw package
java -jar target/quarkus-app/quarkus-run.jar
```

### **Docker**

```bash
# JVM Version
docker build -f src/main/docker/Dockerfile.jvm -t my-app:jvm .
docker run -p 8080:8080 my-app:jvm

# Native Version (benötigt GraalVM)
./mvnw package -Dnative -Dquarkus.native.container-build=true
docker build -f src/main/docker/Dockerfile.native -t my-app:native .
docker run -p 8080:8080 my-app:native
```

### **Environment Variables**

```bash
# Überschreibe application.properties
docker run -p 8080:8080 \
  -e QUARKUS_DATASOURCE_JDBC_URL=jdbc:postgresql://prod-db/mydb \
  -e QUARKUS_DATASOURCE_USERNAME=produser \
  -e QUARKUS_DATASOURCE_PASSWORD=prodpass \
  my-app:jvm
```

---

## 🔧 **Debugging & Troubleshooting**

### **Common Issues**

```bash
# Port bereits belegt
./mvnw quarkus:dev -Dquarkus.http.port=8081

# Memory Issues
export MAVEN_OPTS="-Xmx2g"
./mvnw quarkus:dev

# Native Build Probleme
./mvnw clean package -Dnative -Dquarkus.native.container-build=true

# Database Connection
# Prüfe application.properties
# Stelle sicher, dass DB läuft
```

### **Logging**

```java
@Inject
Logger log;

log.info("Todo created: {}", todo.title);
log.debug("Processing request for user: {}", userId);
log.error("Failed to save todo", exception);
```

### **Health Checks**

```java
@ApplicationScoped
public class DatabaseHealthCheck implements HealthCheck {

    @Inject
    DataSource dataSource;

    @Override
    public HealthCheckResponse call() {
        try {
            dataSource.getConnection().close();
            return HealthCheckResponse.up("Database connection OK");
        } catch (Exception e) {
            return HealthCheckResponse.down("Database connection failed");
        }
    }
}
```

---

## 📚 **Nützliche Links**

- **Offizielle Docs**: https://quarkus.io/guides/
- **Extension Guide**: https://quarkus.io/extensions/
- **Getting Started**: https://quarkus.io/get-started/
- **Examples**: https://github.com/quarkusio/quarkus-quickstarts

---

## 💡 **Pro Tips**

1. **Nutze Dev Mode**: `./mvnw quarkus:dev` für Live Reload
2. **Dev UI verwenden**: http://localhost:8080/q/dev/
3. **Panache für einfache DB-Ops**: Weniger Boilerplate
4. **Extension hinzufügen**: `./mvnw quarkus:add-extension -Dextensions="name"`
5. **Tests schreiben**: `@QuarkusTest` macht es einfach
6. **OpenAPI nutzen**: Swagger UI für API-Testing
7. **Native Builds**: Für Production, aber development mit JVM
8. **Environment Profiles**: `%dev`, `%test`, `%prod` in application.properties

**Happy Coding mit Quarkus! 🚀**
