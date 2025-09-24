import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="change-password-container">
      <h2>Change Password</h2>
      <p>(Feature under development)</p>
    </div>
  `,
  styles: [`
    .change-password-container {
      max-width: 400px;
      margin: 40px auto;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      text-align: center;
      color: #666;
    }
  `]
})
export class ChangePasswordComponent {}
