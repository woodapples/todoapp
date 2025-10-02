# Code-First API Development Workflow

## 🎯 Ihr gewählter Ansatz: Code-First

Sie entwickeln zuerst den Java-Code mit JAX-RS Annotationen, und Quarkus generiert automatisch die OpenAPI-Spezifikation daraus.

## ✅ Was bereits funktioniert:

### 1. Automatische OpenAPI-Generierung

Ihre JAX-RS Annotationen in `TodoResource.java` werden automatisch zu OpenAPI:

```java
@GET
@Path("/{id}")
@Operation(summary = "Get todo by ID")
@APIResponse(responseCode = "200", description = "Todo found")
public TodoResponseDTO getTodoById(@PathParam("id") String id) {
    return todoService.getTodoById(id);
}
```

→ Wird automatisch zu:

```yaml
/api/todos/{id}:
  get:
    summary: Get todo by ID
    responses:
      "200":
        description: Todo found
```

### 2. Live-Dokumentation

- **Swagger UI**: http://localhost:8080/q/swagger-ui
- **OpenAPI JSON**: http://localhost:8080/q/openapi
- **Automatisch aktualisiert** bei Code-Änderungen

## 🚀 Frontend-Integration

### Angular/React Client generieren:

```bash
# 1. OpenAPI-Spec herunterladen
curl http://localhost:8080/q/openapi > api-spec.json

# 2. TypeScript Client generieren
npx @openapitools/openapi-generator-cli generate \
  -i api-spec.json \
  -g typescript-angular \
  -o frontend/src/app/api

# 3. Im Frontend verwenden:
import { TodoService } from './api';
```

## 📝 Development Workflow

### 1. Backend-Entwicklung:

```java
// 1. Neue Endpoint hinzufügen
@GET
@Path("/priority/{priority}")
@Operation(summary = "Get todos by priority")
public List<TodoResponseDTO> getTodosByPriority(@PathParam("priority") Priority priority) {
    return todoService.getTodosByPriority(priority);
}
```

### 2. Automatische Aktualisierung:

- OpenAPI-Spec wird automatisch aktualisiert
- Swagger UI zeigt neuen Endpoint
- Frontend kann neuen Client generieren

### 3. Frontend-Synchronisation:

```bash
# Neuen Client generieren nach Backend-Änderungen
curl http://localhost:8080/q/openapi > api-spec.json
npx openapi-generator-cli generate -i api-spec.json -g typescript-angular -o frontend/src/app/api
```

## 🔧 Erweiterte Annotationen

### Für bessere API-Dokumentation:

```java
@POST
@Operation(
    summary = "Create new todo",
    description = "Creates a new todo item with validation"
)
@APIResponse(responseCode = "201", description = "Todo created",
    content = @Content(schema = @Schema(implementation = TodoResponseDTO.class)))
@APIResponse(responseCode = "400", description = "Validation failed",
    content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
public Response createTodo(@Valid TodoCreateDTO createDto) {
    // Implementation
}
```

### Schema-Dokumentation in DTOs:

```java
public class TodoCreateDTO {
    @Schema(description = "Todo title", example = "Buy groceries", required = true)
    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title too long")
    public String title;

    @Schema(description = "Priority level", example = "HIGH")
    public Priority priority = Priority.MEDIUM;
}
```

## 🎯 Vorteile Ihres Code-First Ansatzes:

✅ **Bestehender Code bleibt** - keine Refactoring nötig
✅ **Automatische Dokumentation** - immer aktuell
✅ **Type Safety** - Java Compiler prüft alles
✅ **Frontend-Integration** - Client-Generierung möglich
✅ **Live Updates** - Dokumentation wird automatisch aktualisiert
✅ **Entwickler-freundlich** - normale Java-Entwicklung

## 🔄 Next Steps:

1. **Testen Sie die API**: http://localhost:8080/q/swagger-ui
2. **Erweitern Sie Annotationen** für bessere Dokumentation
3. **Generieren Sie Frontend-Client** aus der OpenAPI-Spec
4. **Team kann parallel entwickeln** mit der live-generierten Spezifikation

Ihr Setup ist perfekt für produktive Entwicklung! 🚀
