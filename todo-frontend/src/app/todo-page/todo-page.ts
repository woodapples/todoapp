import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemField } from '../item-field/item-field';
import { DividerModule } from 'primeng/divider';
import { Header } from '../header/header';
import { InputField } from '../input-field/input-field';
import { FilterField, FilterOptions } from '../filter-field/filter-field';
import { TodoService } from '../services/todo.service';
import { Todo, TodoCreate, TodoUpdate } from '../model/todo.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [
    CommonModule,
    ItemField,
    DividerModule,
    Header,
    InputField,
    FilterField,
    ToastModule,
  ],
  templateUrl: './todo-page.html',
  styleUrls: ['./todo-page.scss'],
  providers: [MessageService],
})
export class TodoPage implements OnInit {
  todos = signal<Todo[]>([]);
  filteredTodos = signal<Todo[]>([]);
  loading = signal(false);
  currentFilter: FilterOptions = { status: 'all', priority: '' };

  constructor(
    private todoService: TodoService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadTodos();
    // Test backend connectivity
    this.todoService.testBackend().subscribe({
      next: (response) => console.log('Backend test successful:', response),
      error: (error) => console.error('Backend test failed:', error),
    });
  }

  loadTodos() {
    this.loading.set(true);
    this.todoService.getAll().subscribe({
      next: (todos) => {
        this.todos.set(todos);
        this.applyCurrentFilter();
        this.loading.set(false);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load tasks. Please try again.',
          life: 5000,
        });
        this.loading.set(false);
      },
    });
  }

  onFilterChanged(filterOptions: FilterOptions) {
    this.currentFilter = filterOptions;
    this.applyCurrentFilter();
  }

  private applyCurrentFilter() {
    let filtered = [...this.todos()];

    // Apply status filter
    switch (this.currentFilter.status) {
      case 'active':
        filtered = filtered.filter((todo) => !todo.completed);
        break;
      case 'completed':
        filtered = filtered.filter((todo) => todo.completed);
        break;
      case 'all':
      default:
        // Show all todos
        break;
    }

    // Apply priority filter
    if (this.currentFilter.priority) {
      filtered = filtered.filter(
        (todo) => todo.priority === this.currentFilter.priority
      );
    }

    this.filteredTodos.set(filtered);
  }

  onTodoCreated(todoData: TodoCreate) {
    this.loading.set(true);
    this.todoService.create(todoData).subscribe({
      next: (newTodo) => {
        this.todos.update((todos: Todo[]) => [...todos, newTodo]);
        this.applyCurrentFilter();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Task created successfully!',
          life: 4000,
        });
        this.loading.set(false);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create task. Please try again.',
          life: 5000,
        });
        this.loading.set(false);
      },
    });
  }

  onTodoCompleted(todoId: string) {
    const todoToComplete = this.todos().find((t) => t.id === todoId);

    if (!todoToComplete) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Task not found in local state.',
        life: 5000,
      });
      return;
    }

    this.todoService.complete(todoId).subscribe({
      next: (updatedTodo) => {
        this.todos.update((todos: Todo[]) =>
          todos.map((todo) => (todo.id === todoId ? updatedTodo : todo))
        );
        this.applyCurrentFilter();
        this.messageService.add({
          severity: 'success',
          summary: 'Task Completed',
          detail: `"${updatedTodo.title}" marked as completed!`,
          life: 3000,
        });
      },
      error: (error) => {
        console.error('Failed to complete todo:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Failed to mark task as completed. ${
            error.message || 'Please try again.'
          }`,
          life: 5000,
        });
      },
    });
  }

  onTodoUpdated(event: { id: string; update: TodoUpdate }) {
    this.loading.set(true);
    this.todoService.update(event.id, event.update).subscribe({
      next: (updatedTodo) => {
        this.todos.update((todos: Todo[]) =>
          todos.map((todo) => (todo.id === event.id ? updatedTodo : todo))
        );
        this.applyCurrentFilter();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Task "${updatedTodo.title}" updated successfully!`,
          life: 4000,
        });
        this.loading.set(false);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update task. Please try again.',
          life: 5000,
        });
        this.loading.set(false);
      },
    });
  }

  onTodoDeleted(todoId: string) {
    const todoToDelete = this.todos().find((t) => t.id === todoId);

    if (!todoToDelete) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Task not found in local state.',
        life: 5000,
      });
      return;
    }

    this.todoService.delete(todoId).subscribe({
      next: () => {
        this.todos.update((todos: Todo[]) =>
          todos.filter((todo) => todo.id !== todoId)
        );
        this.applyCurrentFilter();
        this.messageService.add({
          severity: 'warn',
          summary: 'Task Deleted',
          detail: `"${todoToDelete.title}" has been permanently deleted.`,
          life: 3000,
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Failed to delete task. Error: ${
            error.message || error.status || 'Unknown error'
          }`,
          life: 5000,
        });
      },
    });
  }
}
