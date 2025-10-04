import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputField } from './components/input-field/input-field';

@Component({
  selector: 'app-root',
  imports: [FormsModule, InputField],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  title = 'Awsome Todo App';
}
