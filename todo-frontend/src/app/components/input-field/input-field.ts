import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-input-field',
  imports: [
    InputTextModule,
    FormsModule,
    TextareaModule,
    ButtonModule,
    FloatLabelModule,
  ],
  templateUrl: './input-field.html',
  styleUrls: ['./input-field.scss'],
})
export class InputField {
  // two-way binding target for the input; parent can also bind via @Input()/Output if needed
  title = '';
  description = '';

  addTodo() {
    if (this.title.trim()) {
      console.log('Adding todo:', {
        title: this.title,
        description: this.description,
      });

      // Reset form after adding
      this.title = '';
      this.description = '';
    }
  }
}
