import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { Todo, TodoUpdate } from '../models/todo.interface';
import { TodoForm, TodoFormData } from '../todo-form/todo-form';

@Component({
  selector: 'app-item-field',
  standalone: true,
  imports: [
    CommonModule,
    PanelModule,
    CheckboxModule,
    DataViewModule,
    ButtonModule,
    TagModule,
    SkeletonModule,
    TooltipModule,
    TodoForm,
  ],
  templateUrl: './item-field.html',
  styleUrls: ['./item-field.scss'],
})
export class ItemField {
  @Input() todos: Todo[] = [];
  @Input() loading: boolean = false;
  @Output() todoCompleted = new EventEmitter<string>();
  @Output() todoDeleted = new EventEmitter<string>();
  @Output() todoUpdated = new EventEmitter<{
    id: string;
    update: TodoUpdate;
  }>();

  // Edit functionality
  showEditDialog = false;
  editingTodo: Todo | null = null;

  openEditDialog(todo: Todo) {
    this.editingTodo = todo;
    this.showEditDialog = true;
  }

  onEditFormSubmitted(formData: TodoFormData) {
    if (this.editingTodo) {
      const update: TodoUpdate = {
        title: formData.title,
        description: formData.description,
        priority: formData.priority,
        completed: formData.completed,
      };

      this.todoUpdated.emit({
        id: this.editingTodo.id,
        update: update,
      });

      this.showEditDialog = false;
      this.editingTodo = null;
    }
  }

  onEditFormCancelled() {
    this.showEditDialog = false;
    this.editingTodo = null;
  }

  onTodoCompleted(todo: Todo) {
    this.todoCompleted.emit(todo.id);
  }

  onTodoDeleted(todo: Todo) {
    this.todoDeleted.emit(todo.id);
  }

  getPriorityLabel(priority?: string): string {
    switch (priority) {
      case 'LOW':
        return 'Low Priority';
      case 'MEDIUM':
        return 'Medium Priority';
      case 'HIGH':
        return 'High Priority';
      case 'URGENT':
        return 'Urgent';
      default:
        return 'Medium Priority';
    }
  }

  getPrioritySeverity(
    priority?: string
  ): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
    switch (priority) {
      case 'LOW':
        return 'info';
      case 'MEDIUM':
        return 'success';
      case 'HIGH':
        return 'warn';
      case 'URGENT':
        return 'danger';
      default:
        return 'success';
    }
  }

  formatDate(dateString?: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  get activeTodos(): Todo[] {
    return this.todos.filter((todo) => !todo.completed);
  }

  get completedTodos(): Todo[] {
    return this.todos.filter((todo) => todo.completed);
  }

  trackByTodoId(index: number, todo: Todo): string {
    return todo.id;
  }
}
