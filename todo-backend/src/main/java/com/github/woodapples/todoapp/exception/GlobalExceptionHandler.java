package com.github.woodapples.todoapp.exception;

import jakarta.validation.ConstraintViolationException;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.ExceptionMapper;
import jakarta.ws.rs.ext.Provider;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * Global Exception Handler
 * 
 * Best Practice: Centralized error handling
 * - Consistent error responses
 * - Security: No internal details exposed
 * - Logging for debugging
 */
@Provider
public class GlobalExceptionHandler implements ExceptionMapper<Exception> {
    
    @Override
    public Response toResponse(Exception exception) {
        if (exception instanceof TodoNotFoundException) {
            return createErrorResponse(404, "Not Found", exception.getMessage());
        }
        
        if (exception instanceof ConstraintViolationException) {
            return createValidationErrorResponse((ConstraintViolationException) exception);
        }
        
        if (exception instanceof IllegalArgumentException) {
            return createErrorResponse(400, "Bad Request", exception.getMessage());
        }
        
        // Log unexpected exceptions mit Stack Trace
        System.err.println("Unexpected exception: " + exception.getMessage());
        exception.printStackTrace();
        return createErrorResponse(500, "Internal Server Error", "An unexpected error occurred");
    }
    
    private Response createErrorResponse(int status, String error, String message) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", status);
        errorResponse.put("error", error);
        errorResponse.put("message", message);
        
        return Response.status(status).entity(errorResponse).build();
    }
    
    private Response createValidationErrorResponse(ConstraintViolationException ex) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", 400);
        errorResponse.put("error", "Validation Failed");
        
        Map<String, String> violations = new HashMap<>();
        ex.getConstraintViolations().forEach(violation -> {
            String field = violation.getPropertyPath().toString();
            violations.put(field, violation.getMessage());
        });
        errorResponse.put("violations", violations);
        
        return Response.status(400).entity(errorResponse).build();
    }
}