import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { Todo } from '../models/todo.interface';

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
    FormsModule,
  ],
  templateUrl: './item-field.html',
  styleUrls: ['./item-field.scss'],
})
export class ItemField {
  @Input() todos: Todo[] = [];
  @Input() loading: boolean = false;
  @Output() todoCompleted = new EventEmitter<string>();
  @Output() todoDeleted = new EventEmitter<string>();

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
