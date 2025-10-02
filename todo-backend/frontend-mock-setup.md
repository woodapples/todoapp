# Frontend Mock-Server Setup

# Das Frontend kann sofort entwickelt werden, auch wenn Backend noch nicht fertig ist

# 1. Mock-Server installieren

npm install -g @stoplight/prism-cli

# 2. Mock-Server starten

prism mock /path/to/openapi.yaml --port 3001

# 3. Frontend verwendet Mock-API

# GET http://localhost:3001/api/todos

# → Gibt automatisch valide Beispieldaten zurück!
