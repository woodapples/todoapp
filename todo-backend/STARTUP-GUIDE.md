# Todo App Startup Guide

## Voraussetzungen

- Java 17+ installiert
- Docker und Docker Compose installiert
- Maven (wird über Maven Wrapper bereitgestellt)

## Schritte zum Starten

### 1. MongoDB starten

```bash
cd /home/maho/Dokumente/CloudComputing/Exercise1
docker-compose -f compose.dev.yml up -d
```

### 2. Prüfen ob MongoDB läuft

```bash
docker ps
# Sollte mongo container im "Up" Status zeigen
```

### 3. MongoDB Connection testen (optional)

```bash
# MongoDB direkt testen
docker exec -it $(docker ps -q -f name=mongo) mongosh -u root -p example
```

### 4. Backend kompilieren und starten

```bash
cd todo-backend
./mvnw clean compile
./mvnw quarkus:dev
```

### 5. API testen

Sobald Quarkus läuft, öffnen Sie:

- Swagger UI: http://localhost:8080/q/swagger-ui
- Health Check: http://localhost:8080/q/health
- OpenAPI Spec: http://localhost:8080/q/openapi

### 6. Test API Call

```bash
# Neues Todo erstellen
curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo","description":"Test description"}'

# Alle Todos abrufen
curl http://localhost:8080/api/todos
```

## Troubleshooting

### Problem: Quarkus startet nicht

1. Überprüfen Sie Java Version: `java -version` (sollte 17+ sein)
2. Überprüfen Sie MongoDB Status: `docker ps`
3. Prüfen Sie die Logs für Fehlermeldungen

### Problem: MongoDB Connection Fehler

1. Stellen Sie sicher, dass MongoDB läuft: `docker ps`
2. Prüfen Sie die Connection String in `application.properties`
3. Testen Sie die Verbindung direkt:
   ```bash
   docker exec -it $(docker ps -q -f name=mongo) mongosh -u root -p example
   ```

### Problem: Port bereits in Verwendung

- MongoDB läuft auf Port 27017
- Quarkus läuft auf Port 8080
- Prüfen Sie mit: `netstat -tulpn | grep :8080`

## Konfiguration

### MongoDB Konfiguration

Die MongoDB läuft mit:

- Username: `root`
- Password: `example`
- Database: `todoapp`
- Port: `27017`

### API Endpoints

- GET /api/todos - Alle Todos
- POST /api/todos - Neues Todo erstellen
- GET /api/todos/{id} - Todo by ID
- PUT /api/todos/{id} - Todo aktualisieren
- DELETE /api/todos/{id} - Todo löschen
- PATCH /api/todos/{id}/complete - Todo als erledigt markieren

## Frontend Integration

Für Angular Frontend:

1. CORS ist bereits konfiguriert für `http://localhost:4200`
2. OpenAPI Client generieren:
   ```bash
   curl http://localhost:8080/q/openapi > api-spec.json
   npx @openapitools/openapi-generator-cli generate \
     -i api-spec.json \
     -g typescript-angular \
     -o src/app/api
   ```
