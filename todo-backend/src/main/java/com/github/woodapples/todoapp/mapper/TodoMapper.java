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
        return todo;
    }
    
    public TodoResponseDTO toResponseDto(Todo entity) {
        try {
            System.out.println("=== MAPPER TO RESPONSE DTO DEBUG ===");
            System.out.println("Entity ID: " + entity.id);
            System.out.println("Entity completed: " + entity.completed);
            
            TodoResponseDTO dto = new TodoResponseDTO();
            dto.id = entity.id != null ? entity.id.toString() : null;
            System.out.println("Mapped ID: " + dto.id);
            
            dto.title = entity.title;
            dto.description = entity.description;
            dto.completed = entity.completed;
            System.out.println("Mapped completed: " + dto.completed);
            
            dto.priority = entity.priority;
            dto.createdAt = entity.createdAt;
            dto.updatedAt = entity.updatedAt;
            
            System.out.println("DTO mapping completed successfully");
            System.out.println("===================================");
            return dto;
        } catch (Exception e) {
            System.err.println("Error in toResponseDto: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
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
        if (dto.completed != null) {
            entity.completed = dto.completed;
        }
    }
}