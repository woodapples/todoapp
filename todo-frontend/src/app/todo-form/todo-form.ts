import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { Todo, TodoCreate, TodoUpdate } from '../models/todo.interface';

export interface TodoFormData {
  title: string;
  description?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  completed?: boolean;
}

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    TextareaModule,
    SelectButtonModule,
    FloatLabelModule,
    ButtonModule,
    CheckboxModule,
  ],
  templateUrl: './todo-form.html',
  styleUrls: ['./todo-form.scss'],
})
export class TodoForm implements OnInit, OnChanges {
  @Input() visible = false;
  @Input() mode: 'create' | 'update' = 'create';
  @Input() todo?: Todo; // For update mode
  @Input() title = 'Todo Form';

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() formSubmitted = new EventEmitter<TodoFormData>();
  @Output() formCancelled = new EventEmitter<void>();

  todoForm!: FormGroup;

  priorityOptions = [
    { label: 'Low', value: 'LOW' },
    { label: 'Medium', value: 'MEDIUM' },
    { label: 'High', value: 'HIGH' },
    { label: 'Urgent', value: 'URGENT' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['todo'] && this.todoForm) {
      this.populateForm();
    }
    if (changes['visible'] && changes['visible'].currentValue) {
      this.populateForm();
    }
  }

  private initForm() {
    this.todoForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(200),
        ],
      ],
      description: ['', [Validators.maxLength(1000)]],
      priority: ['MEDIUM'],
      completed: [false],
    });
  }

  private populateForm() {
    if (this.mode === 'update' && this.todo) {
      this.todoForm.patchValue({
        title: this.todo.title,
        description: this.todo.description || '',
        priority: this.todo.priority || 'MEDIUM',
        completed: this.todo.completed || false,
      });
    } else if (this.mode === 'create') {
      this.todoForm.patchValue({
        title: '',
        description: '',
        priority: 'MEDIUM',
        completed: false,
      });
    }
  }

  onSubmit() {
    if (this.todoForm.valid) {
      const formValue = this.todoForm.value;
      const formData: TodoFormData = {
        title: formValue.title,
        description: formValue.description || undefined,
        priority: formValue.priority,
        completed: this.mode === 'update' ? formValue.completed : false,
      };

      this.formSubmitted.emit(formData);
      this.closeDialog();
    }
  }

  onCancel() {
    this.formCancelled.emit();
    this.closeDialog();
  }

  closeDialog() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.todoForm.reset();
    this.populateForm();
  }

  get submitButtonLabel(): string {
    return this.mode === 'create' ? 'Create Task' : 'Update Task';
  }

  get submitButtonIcon(): string {
    return this.mode === 'create' ? 'pi pi-plus' : 'pi pi-check';
  }

  get showCompletedField(): boolean {
    return this.mode === 'update';
  }
}
