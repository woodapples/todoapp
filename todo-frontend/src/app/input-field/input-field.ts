import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TodoCreate } from '../models/todo.interface';
import { TodoForm, TodoFormData } from '../todo-form/todo-form';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, ButtonModule, TodoForm],
  templateUrl: './input-field.html',
  styleUrls: ['./input-field.scss'],
})
export class InputField {
  @Output() todoCreated = new EventEmitter<TodoCreate>();

  showCreateDialog = false;

  onShowCreateDialog() {
    this.showCreateDialog = true;
  }

  onFormSubmitted(formData: TodoFormData) {
    const todoData: TodoCreate = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
    };

    this.todoCreated.emit(todoData);
    this.showCreateDialog = false;
  }

  onFormCancelled() {
    this.showCreateDialog = false;
  }
}
