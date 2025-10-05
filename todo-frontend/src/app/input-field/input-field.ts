import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectModule } from 'primeng/select';
import { DialogModule } from 'primeng/dialog';
import { TodoCreate } from '../models/todo.interface';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    FormsModule,
    TextareaModule,
    ButtonModule,
    FloatLabelModule,
    SelectModule,
    DialogModule,
  ],
  templateUrl: './input-field.html',
  styleUrls: ['./input-field.scss'],
})
export class InputField {
  @Output() todoCreated = new EventEmitter<TodoCreate>();

  title = '';
  description = '';
  categories = [
    { label: 'Low', value: 'LOW' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'High', value: 'HIGH' },
    { label: 'Urgent', value: 'URGENT' },
  ];
  selectedCategory: string = 'MEDIUM';
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
  }

  addTodo() {
    if (this.title.trim()) {
      const todoData: TodoCreate = {
        title: this.title.trim(),
        description: this.description.trim() || undefined,
        priority: this.selectedCategory as 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT',
      };

      // Emit das Todo-Daten Event
      this.todoCreated.emit(todoData);

      // Reset form nach dem Erstellen
      this.resetForm();

      // Dialog schließen
      this.hideDialog();
    }
  }

  private resetForm() {
    this.title = '';
    this.description = '';
    this.selectedCategory = 'MEDIUM';
  }
}
