import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../models/todo.interface';

export interface FilterOptions {
  status: 'all' | 'active' | 'completed';
  priority: string;
}

@Component({
  selector: 'app-filter-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-field.html',
  styleUrl: './filter-field.scss',
})
export class FilterField implements OnInit {
  @Input() todos: Todo[] = [];
  @Output() filterChanged = new EventEmitter<FilterOptions>();

  activeFilter: 'all' | 'active' | 'completed' = 'all';
  priorityFilter: string = '';

  ngOnInit() {
    this.emitFilterChange();
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.activeFilter = filter;
    this.emitFilterChange();
  }

  onPriorityFilterChange() {
    this.emitFilterChange();
  }

  resetFilters() {
    this.activeFilter = 'all';
    this.priorityFilter = '';
    this.emitFilterChange();
  }

  private emitFilterChange() {
    this.filterChanged.emit({
      status: this.activeFilter,
      priority: this.priorityFilter,
    });
  }

  get activeTodos(): Todo[] {
    return this.todos.filter((todo) => !todo.completed);
  }

  get completedTodos(): Todo[] {
    return this.todos.filter((todo) => todo.completed);
  }
}
