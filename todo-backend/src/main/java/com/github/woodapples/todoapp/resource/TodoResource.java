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
 * 
 * API-First Approach: Diese Klasse implementiert die in openapi.yaml definierte API-Spezifikation
 * Best Practice: Thin controller layer
 * - Delegation to service layer
 * - Proper HTTP status codes
 * - Comprehensive OpenAPI documentation
 * - Input validation
 * - Contract-first implementation
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
    @Path("/test")
    public String test() {
        return "TodoResource is working!";
    }
    
    @GET
    @Path("/debug/{id}")
    @Operation(summary = "Debug todo by ID")
    public Response debugTodo(@PathParam("id") String id) {
        try {
            System.out.println("=== DEBUG ENDPOINT CALLED ===");
            System.out.println("ID parameter: " + id);
            
            TodoResponseDTO todo = todoService.getTodoById(id);
            System.out.println("Todo found: " + todo.id + " - " + todo.title);
            
            return Response.ok(todo).build();
        } catch (Exception e) {
            System.err.println("Debug endpoint error: " + e.getMessage());
            e.printStackTrace();
            return Response.status(500)
                .entity("Debug error: " + e.getMessage())
                .build();
        }
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
    @Operation(summary = "Search todos by title")
    public List<TodoResponseDTO> searchTodos(@QueryParam("q") String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return todoService.getAllTodos();
        }
        return todoService.searchTodos(searchTerm);
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
    public Response completeTodo(@PathParam("id") String id) {
        try {
            System.out.println("=== COMPLETE ENDPOINT CALLED ===");
            System.out.println("ID parameter: " + id);
            
            TodoResponseDTO result = todoService.completeTodo(id);
            System.out.println("Complete operation successful");
            
            return Response.ok(result).build();
        } catch (Exception e) {
            System.err.println("Complete endpoint error: " + e.getMessage());
            e.printStackTrace();
            return Response.status(500)
                .entity("Complete error: " + e.getMessage())
                .build();
        }
    }
    
    @DELETE
    @Path("/{id}")
    @Operation(summary = "Delete todo")
    @APIResponse(responseCode = "204", description = "Todo deleted successfully")
    @APIResponse(responseCode = "404", description = "Todo not found")
    public Response deleteTodo(@PathParam("id") String id) {
        try {
            System.out.println("=== DELETE ENDPOINT CALLED ===");
            System.out.println("ID parameter: " + id);
            
            todoService.deleteTodo(id);
            System.out.println("Delete operation successful");
            
            return Response.noContent().build();
        } catch (Exception e) {
            System.err.println("Delete endpoint error: " + e.getMessage());
            e.printStackTrace();
            return Response.status(500)
                .entity("Delete error: " + e.getMessage())
                .build();
        }
    }
}