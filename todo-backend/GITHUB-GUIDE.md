# 🔄 GitHub Repository Struktur - Was gehört wohin?

## ✅ **AUF GITHUB (committen):**

### 📁 **Quellcode**

```
src/
├── main/
│   ├── java/com/github/woodapples/todoapp/
│   │   ├── entity/Todo.java               ✅
│   │   ├── dto/*.java                     ✅
│   │   ├── mapper/TodoMapper.java         ✅
│   │   ├── service/TodoService.java       ✅
│   │   ├── resource/TodoResource.java     ✅
│   │   └── exception/*.java              ✅
│   └── resources/
│       ├── application.properties         ✅
│       └── META-INF/openapi.yaml         ✅ (optional)
└── test/
    └── java/                             ✅
```

### 📄 **Build & Config Files**

```
pom.xml                                   ✅ (Maven dependencies)
mvnw                                      ✅ (Maven Wrapper)
mvnw.cmd                                  ✅ (Windows)
.mvn/wrapper/                             ✅ (Maven Wrapper config)
```

### 📚 **Dokumentation**

```
README.md                                 ✅ (Projekt-Übersicht)
API-FIRST.md                             ✅ (API-Dokumentation)
CODE-FIRST-WORKFLOW.md                   ✅ (Entwickler-Guide)
```

### 🐳 **Container & Deployment**

```
src/main/docker/Dockerfile.*             ✅ (falls vorhanden)
.dockerignore                            ✅
compose.dev.yml                          ✅ (falls vorhanden)
```

### ⚙️ **CI/CD & Config**

```
.github/workflows/                        ✅ (GitHub Actions)
.gitignore                               ✅ (Git ignore rules)
```

## ❌ **NICHT AUF GITHUB (ignorieren):**

### 🏗️ **Build Artifacts**

```
target/                                   ❌ (Maven build output)
*.jar                                     ❌ (Compiled JARs)
*.war                                     ❌ (Web Archives)
```

### 🔧 **IDE-spezifische Dateien**

```
.idea/                                    ❌ (IntelliJ)
.vscode/                                  ❌ (VS Code)
.eclipse/                                 ❌ (Eclipse)
*.iml                                     ❌ (IntelliJ Module)
.classpath                               ❌ (Eclipse)
.project                                 ❌ (Eclipse)
```

### 🔐 **Sensitive Daten**

```
.env                                      ❌ (Environment variables)
application-prod.properties              ❌ (Production configs)
*.key                                     ❌ (Private keys)
*.p12                                     ❌ (Certificates)
secrets/                                  ❌ (Secret files)
```

### 📱 **Runtime & Logs**

```
logs/                                     ❌ (Log files)
*.log                                     ❌ (Log files)
.quarkus/                                ❌ (Quarkus runtime)
quarkus.log                              ❌ (Quarkus logs)
```

### 🗂️ **Temporäre Dateien**

```
*.tmp                                     ❌ (Temp files)
*.swp                                     ❌ (Vim swap)
.DS_Store                                ❌ (macOS)
Thumbs.db                                ❌ (Windows)
```

## 🏷️ **Spezielle Fälle:**

### 📝 **Dokumentation (bedingt)**

```
code-first-example.md                     ⚠️  (Entwickler-Notizen - optional)
visual-api-design.md                      ⚠️  (Entwickler-Notizen - optional)
frontend-mock-setup.md                    ⚠️  (Team-intern - optional)
```

### 🔧 **Konfiguration (Production)**

```
application-dev.properties                ✅ (Development config)
application-test.properties               ✅ (Test config)
application-prod.properties               ❌ (Production secrets!)
```

## 🚀 **Empfohlene Repository-Struktur:**

```
todo-app/
├── README.md                             ✅ Projekt-Übersicht
├── .gitignore                           ✅ Git ignore rules
├── docker-compose.yml                   ✅ Local development
├── .github/workflows/                    ✅ CI/CD
│   ├── build.yml                        ✅ Build pipeline
│   └── deploy.yml                       ✅ Deployment
├── docs/                                ✅ Erweiterte Dokumentation
│   ├── API.md                          ✅ API-Dokumentation
│   ├── DEPLOYMENT.md                   ✅ Deployment-Guide
│   └── DEVELOPMENT.md                  ✅ Entwickler-Setup
├── todo-backend/                        ✅ Backend-Code
│   ├── src/                            ✅ Quellcode
│   ├── pom.xml                         ✅ Maven config
│   └── README.md                       ✅ Backend-spezifisch
└── todo-frontend/                       ✅ Frontend-Code
    ├── src/                            ✅ Angular/React code
    ├── package.json                    ✅ NPM dependencies
    └── README.md                       ✅ Frontend-spezifisch
```

## 💡 **Best Practices:**

### ✅ **Immer committen:**

- Quellcode ohne Secrets
- Build-Konfiguration (pom.xml, package.json)
- Dokumentation
- Tests
- CI/CD-Definitionen

### ❌ **Niemals committen:**

- Build-Artifacts (target/, node_modules/, dist/)
- IDE-Konfiguration
- Logs und temporäre Dateien
- Production-Secrets
- Persönliche Einstellungen

### ⚠️ **Vorsichtig mit:**

- Entwickler-Notizen (können hilfreich sein)
- Beispiel-Konfigurationen (ohne echte Credentials)
- Generated Code (falls regenerierbar)

Ihre aktuelle `.gitignore` ist bereits sehr gut konfiguriert! 👍
