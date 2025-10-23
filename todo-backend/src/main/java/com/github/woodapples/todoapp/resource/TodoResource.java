package com.github.woodapples.todoapp.resource;

import com.github.woodapples.todoapp.dto.TodoCreateDTO;
import com.github.woodapples.todoapp.dto.TodoUpdateDTO;
import com.github.woodapples.todoapp.dto.TodoResponseDTO;
import com.github.woodapples.todoapp.service.TodoService;
import com.github.woodapples.todoapp.entity.Todo;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.enterprise.context.ApplicationScoped;
import java.util.List;

/**
 * Todo Resource - REST API Endpoints
 */
@Path("/api/todos")
@Tag(name = "Todo Management", description = "CRUD operations for Todo items")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class TodoResource {
    
    @Inject
    TodoService todoService;
    
    @GET
    @Path("/health")
    @Operation(summary = "Health check endpoint")
    @APIResponse(responseCode = "200", description = "Service is healthy")
    public Response healthCheck() {
        return Response.ok("Todo service is healthy").build();
    }
    
    @GET
    @Operation(summary = "Get all todos", description = "Retrieves all todo items with optional filtering")
    @APIResponse(responseCode = "200", description = "List of todos", 
                content = @Content(schema = @Schema(implementation = TodoResponseDTO.class)))
    public List<TodoResponseDTO> getAllTodos(
            @QueryParam("completed") Boolean completed,
            @QueryParam("priority") Todo.Priority priority) {
        
        if (completed != null) {
            return todoService.getTodosByStatus(completed);
        }
        if (priority != null) {
            return todoService.getTodosByPriority(priority);
        }
        return todoService.getAllTodos();
    }
   
    @GET
    @Path("/search")
    @Operation(summary = "Search todos by title", description = "Search for todos containing the specified term in their title")
    @APIResponse(responseCode = "200", description = "List of matching todos")
    public List<TodoResponseDTO> searchTodos(@QueryParam("q") String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return todoService.getAllTodos();
        }
        return todoService.searchTodos(searchTerm);
    }

    @PATCH
    @Path("/{id}/incomplete")
    @Operation(summary = "Mark todo as incomplete")
    @APIResponse(responseCode = "200", description = "Todo marked as incomplete")
    @APIResponse(responseCode = "404", description = "Todo not found")
    @APIResponse(responseCode = "400", description = "Invalid todo ID format")
    public TodoResponseDTO markIncomplete(@PathParam("id") String id) {
        return todoService.markIncomplete(id);
    }

    @GET
    @Path("/count")
    @Operation(summary = "Get todo counts by status")
    @APIResponse(responseCode = "200", description = "Todo count statistics")
    public Response getTodoCounts() {
        long totalCount = todoService.getTotalCount();
        long completedCount = todoService.getCompletedCount();
        long pendingCount = totalCount - completedCount;
        
        var stats = new java.util.HashMap<String, Long>();
        stats.put("total", totalCount);
        stats.put("completed", completedCount);
        stats.put("pending", pendingCount);
        
        return Response.ok(stats).build();
    }
   
    @GET
    @Path("/{id}")
    @Operation(summary = "Get todo by ID")
    @APIResponse(responseCode = "200", description = "Todo found")
    @APIResponse(responseCode = "404", description = "Todo not found")
    public TodoResponseDTO getTodoById(@PathParam("id") String id) {
        return todoService.getTodoById(id);
    }
    
    @POST
    @Operation(summary = "Create new todo")
    @APIResponse(responseCode = "201", description = "Todo created successfully")
    @APIResponse(responseCode = "400", description = "Invalid input")
    public Response createTodo(@Valid TodoCreateDTO createDto) {
        TodoResponseDTO created = todoService.createTodo(createDto);
        return Response.status(201).entity(created).build();
    }
    
    @PUT
    @Path("/{id}")
    @Operation(summary = "Update todo")
    @APIResponse(responseCode = "200", description = "Todo updated successfully")
    @APIResponse(responseCode = "404", description = "Todo not found")
    public TodoResponseDTO updateTodo(@PathParam("id") String id, 
                                      @Valid TodoUpdateDTO updateDTO) {
        return todoService.updateTodo(id, updateDTO);
    }
    
    @PATCH
    @Path("/{id}/complete")
    @Operation(summary = "Mark todo as completed")
    @APIResponse(responseCode = "200", description = "Todo marked as completed")
    @APIResponse(responseCode = "404", description = "Todo not found")
    @APIResponse(responseCode = "400", description = "Invalid todo ID format")
    public TodoResponseDTO completeTodo(@PathParam("id") String id) {
        return todoService.completeTodo(id);
    }
    
    @DELETE
    @Path("/{id}")
    @Operation(summary = "Delete todo")
    @APIResponse(responseCode = "204", description = "Todo deleted successfully")
    @APIResponse(responseCode = "404", description = "Todo not found")
    @APIResponse(responseCode = "400", description = "Invalid todo ID format")
    public Response deleteTodo(@PathParam("id") String id) {
        todoService.deleteTodo(id);
        return Response.noContent().build();
    }
}