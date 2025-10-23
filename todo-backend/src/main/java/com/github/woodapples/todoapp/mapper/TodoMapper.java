package com.github.woodapples.todoapp.mapper;

import com.github.woodapples.todoapp.entity.Todo;
import com.github.woodapples.todoapp.dto.TodoCreateDTO;
import com.github.woodapples.todoapp.dto.TodoUpdateDTO;
import com.github.woodapples.todoapp.dto.TodoResponseDTO;

import jakarta.enterprise.context.ApplicationScoped;

/**
 * Todo Mapper - Entity↔DTO Conversion
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
            
            TodoResponseDTO dto = new TodoResponseDTO();
            dto.id = entity.id != null ? entity.id.toString() : null;
            
            dto.title = entity.title;
            dto.description = entity.description;
            dto.completed = entity.completed;
            
            dto.priority = entity.priority;
            dto.createdAt = entity.createdAt;
            dto.updatedAt = entity.updatedAt;
            
            return dto;
        } catch (Exception e) {
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