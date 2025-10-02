package com.github.woodapples.todoapp.exception;

/**
 * Business Exception für nicht gefundene TODOs
 */
public class TodoNotFoundException extends RuntimeException {
    
    public TodoNotFoundException(String message) {
        super(message);
    }
    
    public TodoNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}