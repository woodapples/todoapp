# Reverse Engineering: Java Code → OpenAPI

# Ihre bestehenden JAX-RS Annotationen generieren automatisch die OpenAPI-Spezifikation

# Konfiguration in application.properties:

mp.openapi.extensions.smallrye.scan.enabled=true
mp.openapi.extensions.smallrye.scan.packages=com.github.woodapples.todoapp.resource

# Quarkus generiert automatisch aus Ihren @Path, @GET, @POST Annotationen:

# → http://localhost:8080/q/openapi (JSON/YAML)

# → Swagger UI

# Beispiel aus Ihrem TodoResource.java:

@GET
@Path("/{id}")
@Operation(summary = "Get todo by ID")
@APIResponse(responseCode = "200", description = "Todo found")
public TodoResponseDTO getTodoById(@PathParam("id") String id) {
return todoService.getTodoById(id);
}

# Wird automatisch zu OpenAPI:

paths:
/api/todos/{id}:
get:
summary: Get todo by ID
parameters: - name: id
in: path
required: true
schema:
type: string
responses:
'200':
description: Todo found
content:
application/json:
schema:
$ref: '#/components/schemas/TodoResponseDTO'
