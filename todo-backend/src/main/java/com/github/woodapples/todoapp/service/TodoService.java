package com.github.woodapples.todoapp.service;

import com.github.woodapples.todoapp.entity.Todo;
import com.github.woodapples.todoapp.dto.TodoCreateDTO;
import com.github.woodapples.todoapp.dto.TodoUpdateDTO;
import com.github.woodapples.todoapp.dto.TodoResponseDTO;
import com.github.woodapples.todoapp.mapper.TodoMapper;
import com.github.woodapples.todoapp.exception.TodoNotFoundException;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Todo Service - Business Logic Layer
 */
@ApplicationScoped
public class TodoService {
    
    @Inject
    TodoMapper todoMapper;
    
    /**
     * Retrieve all todos
     * @return List of all todos as DTOs
     */
    public List<TodoResponseDTO> getAllTodos() {
        return Todo.<Todo>listAll()
                .stream()
                .map(todoMapper::toResponseDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Filter todos by completion status
     * @param completed true for completed todos, false for pending
     * @return Filtered list of todos
     */
    public List<TodoResponseDTO> getTodosByStatus(boolean completed) {
        return Todo.findByCompleted(completed)
                .stream()
                .map(todoMapper::toResponseDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Filter todos by priority
     * @param priority Priority level to filter by
     * @return Todos with specified priority
     */
    public List<TodoResponseDTO> getTodosByPriority(Todo.Priority priority) {
        return Todo.findByPriorityOrderedByDueDate(priority)
                .stream()
                .map(todoMapper::toResponseDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Get a single todo by ID
     * @param id Todo ID as string
     * @return Todo DTO
     * @throws TodoNotFoundException if todo doesn't exist
     */
    public TodoResponseDTO getTodoById(String id) {
        Todo todo = findTodoById(id);
        return todoMapper.toResponseDto(todo);
    }
    
    /**
     * Create a new todo
     * @param createDto Data for new todo
     * @return Created todo as DTO
     */
    // @Transactional // Removed for MongoDB Standalone (no Replica Set support)
    public TodoResponseDTO createTodo(TodoCreateDTO createDto) {
        Todo todo = todoMapper.toEntity(createDto);
        todo.prePersist(); // Setzt Timestamps
        todo.persist();
        return todoMapper.toResponseDto(todo);
    }
    
    /**
     * Update an existing todo
     * @param id Todo ID
     * @param updateDto Data to update
     * @return Updated todo as DTO
     * @throws TodoNotFoundException if todo doesn't exist
     */
    // @Transactional // Removed for MongoDB Standalone (no Replica Set support)
    public TodoResponseDTO updateTodo(String id, TodoUpdateDTO updateDto) {
        Todo existingTodo = findTodoById(id);
        todoMapper.updateEntityFromDto(updateDto, existingTodo);
        existingTodo.updateModificationTime();
        // Für MongoDB ohne Transaktionen explizit updaten
        existingTodo.update();
        return todoMapper.toResponseDto(existingTodo);
    }
    
    /**
     * Mark a todo as completed
     * @param id Todo ID
     * @return Updated todo as DTO
     * @throws TodoNotFoundException if todo doesn't exist
     */
    // @Transactional // Removed for MongoDB Standalone (no Replica Set support)
    public TodoResponseDTO completeTodo(String id) {
        Todo todo = findTodoById(id);
        todo.markCompleted();
        todo.update(); // Explicit update for MongoDB without transactions
        return todoMapper.toResponseDto(todo);
    }
    
    /**
     * Delete a todo
     * @param id Todo ID
     * @throws TodoNotFoundException if todo doesn't exist
     */
    // @Transactional // Removed for MongoDB Standalone (no Replica Set support)
    public void deleteTodo(String id) {
        Todo todo = findTodoById(id);
        todo.delete();
    }
   
    /**
     * Search todos by title
     * @param searchTerm Search term to match against title
     * @return Matching todos
     */
    public List<TodoResponseDTO> searchTodos(String searchTerm) {
        return Todo.findByTitleContaining(searchTerm)
                .stream()
                .map(todoMapper::toResponseDto)
                .collect(Collectors.toList());
    }

    /**
     * Mark a todo as incomplete
     * @param id Todo ID
     * @return Updated todo as DTO
     * @throws TodoNotFoundException if todo doesn't exist
     */
    public TodoResponseDTO markIncomplete(String id) {
        Todo todo = findTodoById(id);
        todo.markIncomplete();
        todo.update();
        return todoMapper.toResponseDto(todo);
    }

    /**
     * Get total count of todos
     * @return Total number of todos
     */
    public long getTotalCount() {
        return Todo.count();
    }

    /**
     * Get count of completed todos
     * @return Number of completed todos
     */
    public long getCompletedCount() {
        return Todo.count("completed", true);
    }
  
    /**
     * Helper method to find todo by ID and handle not found case
     * @param id Todo ID as string
     * @return Todo entity
     * @throws TodoNotFoundException if todo doesn't exist
     */
    private Todo findTodoById(String id) {
        try {
            ObjectId objectId = new ObjectId(id);
            Todo todo = Todo.findById(objectId);
            if (todo == null) {
                throw new TodoNotFoundException("Todo with ID " + id + " not found");
            }
            return todo;
        } catch (IllegalArgumentException e) {
            throw new TodoNotFoundException("Invalid Todo ID format: " + id);
        }
    }
}