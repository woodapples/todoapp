package com.github.woodapples.todoapp.mapper;

import com.github.woodapples.todoapp.entity.Todo;
import com.github.woodapples.todoapp.dto.TodoCreateDTO;
import com.github.woodapples.todoapp.dto.TodoUpdateDTO;
import com.github.woodapples.todoapp.dto.TodoResponseDTO;

import jakarta.enterprise.context.ApplicationScoped;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

/**
 * Todo Mapper - Entity↔DTO Conversion
 * 
 * Best Practice: Explicit mapping layer
 * - Separation of concerns
 * - Computed fields in DTOs
 * - Type safety
 */
@ApplicationScoped
public class TodoMapper {
    
    public Todo toEntity(TodoCreateDTO dto) {
        Todo todo = new Todo();
        todo.title = dto.title;
        todo.description = dto.description;
        todo.priority = dto.priority != null ? dto.priority : Todo.Priority.MEDIUM;
        todo.dueDate = dto.dueDate;
        todo.tags = dto.tags;
        return todo;
    }
    
    public TodoResponseDTO toResponseDto(Todo entity) {
        TodoResponseDTO dto = new TodoResponseDTO();
        dto.id = entity.id.toString();
        dto.title = entity.title;
        dto.description = entity.description;
        dto.completed = entity.completed;
        dto.priority = entity.priority;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        dto.dueDate = entity.dueDate;
        dto.tags = entity.tags;
        
        // Computed Fields
        dto.overdue = entity.isOverdue();
        dto.daysUntilDue = calculateDaysUntilDue(entity.dueDate);
        
        return dto;
    }
    
    public void updateEntityFromDto(TodoUpdateDTO dto, Todo entity) {
        if (dto.title != null) {
            entity.title = dto.title;
        }
        if (dto.description != null) {
            entity.description = dto.description;
        }
        if (dto.priority != null) {
            entity.priority = dto.priority;
        }
        if (dto.dueDate != null) {
            entity.dueDate = dto.dueDate;
        }
        if (dto.tags != null) {
            entity.tags = dto.tags;
        }
        if (dto.completed != null) {
            entity.completed = dto.completed;
        }
    }
    
    private Long calculateDaysUntilDue(LocalDateTime dueDate) {
        if (dueDate == null) return null;
        return ChronoUnit.DAYS.between(LocalDateTime.now(), dueDate);
    }
}