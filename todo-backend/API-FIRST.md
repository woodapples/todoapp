# Todo API - API-First Development

Dieses Projekt folgt dem **API-First-Ansatz** für die Entwicklung der Todo-Management-API.

## API-First Workflow

### 1. API-Spezifikation definieren

Die OpenAPI-Spezifikation befindet sich in:

```
src/main/resources/META-INF/openapi.yaml
```

### 2. Code aus Spezifikation generieren (Optional)

```bash
./mvnw clean generate-sources
```

Dies generiert:

- **API-Interfaces** in `com.github.woodapples.todoapp.api`
- **Model-Klassen** in `com.github.woodapples.todoapp.model`

### 3. Implementierung schreiben

Die bestehende Implementierung in `TodoResource.java` folgt der API-Spezifikation.

## Verfügbare Endpoints

| Method | Endpoint                     | Beschreibung                       |
| ------ | ---------------------------- | ---------------------------------- |
| GET    | `/api/todos`                 | Alle TODOs abrufen (mit Filterung) |
| POST   | `/api/todos`                 | Neues TODO erstellen               |
| GET    | `/api/todos/{id}`            | TODO by ID abrufen                 |
| PUT    | `/api/todos/{id}`            | TODO aktualisieren                 |
| DELETE | `/api/todos/{id}`            | TODO löschen                       |
| PATCH  | `/api/todos/{id}/complete`   | TODO als erledigt markieren        |
| GET    | `/api/todos/overdue`         | Überfällige TODOs                  |
| GET    | `/api/todos/search?q={term}` | TODOs durchsuchen                  |
| GET    | `/api/todos/tag/{tag}`       | TODOs nach Tag filtern             |

## API-Dokumentation

### Swagger UI

- **URL**: http://localhost:8080/q/swagger-ui
- **Beschreibung**: Interaktive API-Dokumentation zum Testen

### OpenAPI Specification

- **URL**: http://localhost:8080/q/openapi
- **Format**: JSON/YAML
- **Verwendung**: Für Code-Generierung, Tools, etc.

## Vorteile des API-First Ansatzes

1. **Contract-First**: API-Vertrag wird zuerst definiert
2. **Team-Synchronisation**: Frontend und Backend können parallel entwickeln
3. **Dokumentation**: API-Dokumentation ist immer aktuell
4. **Tooling**: Automatische Code-Generierung möglich
5. **Testing**: Mock-Server und Tests basierend auf Spezifikation
6. **Validation**: Automatische Validierung von Request/Response

## Development Workflow

1. **API ändern**: `openapi.yaml` bearbeiten
2. **Code regenerieren**: `./mvnw generate-sources` (falls verwendet)
3. **Implementierung anpassen**: Controller/Service-Code aktualisieren
4. **Testen**: Swagger UI oder Tests verwenden
5. **Dokumentation**: Automatisch durch OpenAPI generiert

## Schema-Validierung

Die API verwendet automatische Validierung basierend auf der OpenAPI-Spezifikation:

- **Request-Validierung**: Eingehende Daten werden validiert
- **Response-Validierung**: Ausgehende Daten entsprechen dem Schema
- **Type Safety**: Starke Typisierung durch generierte Modelle

## Nächste Schritte

1. Öffnen Sie http://localhost:8080/q/swagger-ui
2. Testen Sie die API-Endpoints interaktiv
3. Passen Sie `openapi.yaml` nach Bedarf an
4. Implementieren Sie zusätzliche Business Logic
