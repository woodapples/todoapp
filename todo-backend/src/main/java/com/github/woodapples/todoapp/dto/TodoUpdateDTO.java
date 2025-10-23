package com.github.woodapples.todoapp.dto;

import com.github.woodapples.todoapp.entity.Todo.Priority;
import org.eclipse.microprofile.openapi.annotations.media.Schema;

import jakarta.validation.constraints.Size;

/**
 * DTO for Todo Updates
 */
@Schema(description = "Todo update request")
public class TodoUpdateDTO {
    
    @Size(min = 1, max = 200, message = "Title: 1-200 Letters")
    @Schema(description = "Updated todo title", example = "New Shoppinglist")
    public String title;
    
    @Size(max = 1000, message = "Description: max 1000 Letters")
    @Schema(description = "Updated description", example = "Milk, Bred, Eggs, Cheese")
    public String description;
    
    @Schema(description = "Completion status", example = "true")
    public Boolean completed;
    
    @Schema(description = "Updated priority level", example = "HIGH")
    public Priority priority;
    
    // Konstruktoren
    public TodoUpdateDTO() {}
    
    public TodoUpdateDTO(String title, Boolean completed) {
        this.title = title;
        this.completed = completed;
    }
}
