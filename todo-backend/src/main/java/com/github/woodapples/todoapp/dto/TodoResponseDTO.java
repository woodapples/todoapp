package com.github.woodapples.todoapp.dto;

import com.github.woodapples.todoapp.entity.Todo.Priority;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for Todo Responses
 * 
 * Best Practice: Response DTOs include computed fields
 * and hide internal entity details
 */
@Schema(description = "Todo response")
public class TodoResponseDTO {
    
    @Schema(description = "Unique identifier", example = "507f1f77bcf86cd799439011")
    public String id;
    
    @Schema(description = "Todo title", example = "Einkaufen gehen")
    public String title;
    
    @Schema(description = "Todo description", example = "Milch, Brot, Eier")
    public String description;
    
    @Schema(description = "Completion status", example = "false")
    public boolean completed;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Schema(description = "Creation timestamp", example = "2025-10-02T14:30:00")
    public LocalDateTime createdAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Schema(description = "Last update timestamp", example = "2025-10-02T15:45:00")
    public LocalDateTime updatedAt;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Schema(description = "Due date", example = "2025-10-03T18:00:00")
    public LocalDateTime dueDate;
    
    @Schema(description = "Todo priority", example = "MEDIUM")
    public Priority priority;
    
    @Schema(description = "Category tags", example = "[\"shopping\", \"personal\"]")
    public List<String> tags;
    
    // Computed Fields
    @Schema(description = "Whether todo is overdue", example = "false")
    public boolean overdue;
    
    @Schema(description = "Days until due date", example = "3")
    public Long daysUntilDue;
}