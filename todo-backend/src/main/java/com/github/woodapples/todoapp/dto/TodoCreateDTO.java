package com.github.woodapples.todoapp.dto;

import com.github.woodapples.todoapp.entity.Todo.Priority;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * DTO for Todo Creation
 * 
 * Best Practice: Separate DTOs for different operations
 * - Prevents over-posting attacks
 * - Clear API contracts
 * - Validation per use-case
 */
@Schema(description = "Todo creation request")
public class TodoCreateDTO {
    
    @NotBlank(message = "Title is required")
    @Size(min = 1, max = 200, message = "Title: 1-200 Letters")
    @Schema(description = "Todo title", example = "Go shopping", required = true)
    public String title;
    
    @Size(max = 1000, message = "Description: max 1000 Letters")
    @Schema(description = "Optional description", example = "Milk, Bred, Eggs")
    public String description;
    
    @Schema(description = "Priority level", example = "HIGH")
    public Priority priority = Priority.MEDIUM;
    
    // Konstruktoren
    public TodoCreateDTO() {}
    
    public TodoCreateDTO(String title, String description) {
        this.title = title;
        this.description = description;
    }
}