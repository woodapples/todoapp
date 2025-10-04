package com.github.woodapples.todoapp.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.eclipse.microprofile.openapi.annotations.media.Schema;

import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;
import io.quarkus.panache.common.Sort;

/**
 * Todo Entity - Domain Model
 * 
 * Best Practice: Entity repräsentiert Business Domain, nicht API Contract
 * Separated from DTOs for clean architecture
 */
@MongoEntity(collection = "todos")
@Schema(description = "Todo domain entity")
public class Todo extends PanacheMongoEntity {
    
    public String title;
    public String description;
    public boolean completed = false;
    public Priority priority = Priority.MEDIUM;
    public LocalDateTime createdAt;
    public LocalDateTime updatedAt;
    public LocalDateTime dueDate;
    public List<String> tags;

    public enum Priority {
        LOW(1), MEDIUM(2), HIGH(3), URGENT(4);
        
        private final int value;
        Priority(int value) { this.value = value; }
        public int getValue() { return value; }
    }
    
    // Konstruktoren
    public Todo() {}
    
    public Todo(String title, String description) {
        this.title = title;
        this.description = description;
        this.prePersist();
    }
    
    // Lifecycle Hook für Timestamps
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        if (this.createdAt == null) {
            this.createdAt = now;
        }
        this.updatedAt = now;
    }
    
    // Business Logic Methods
    public void markCompleted() {
        this.completed = true;
        this.prePersist(); // Update timestamp
    }
    
    public void markIncomplete() {
        this.completed = false;
        this.prePersist(); // Update timestamp
    }
    
    public void updateModificationTime() {
        this.prePersist(); // Update timestamp
    }
    
    public boolean isOverdue() {
        return dueDate != null && dueDate.isBefore(LocalDateTime.now()) && !completed;
    }
    
    // Custom Queries als Static Methods
    public static List<Todo> findByCompleted(boolean completed) {
        return find("completed", completed).list();
    }
    
    public static List<Todo> findOverdue() {
        return find("dueDate < ?1 and completed = false", LocalDateTime.now()).list();
    }
    
    public static List<Todo> findByPriorityOrderedByDueDate(Priority priority) {
        return find("priority = ?1", Sort.by("dueDate"), priority).list();
    }
    
    public static List<Todo> findByTag(String tag) {
        return find("tags", tag).list();
    }
    
    public static List<Todo> findByTitleContaining(String searchTerm) {
        return find("title like ?1", "%" + searchTerm + "%").list();
    }
}