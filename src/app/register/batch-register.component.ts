import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../app.config';

interface User {
  username: string;
  name: string;
  password: string;
  role: string;
  flatNo: string;
  active?: boolean;
}

@Component({
  selector: 'app-batch-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './batch-register.component.html',
  styleUrls: ['./batch-register.component.scss']
})
export class BatchRegisterComponent {
  usersJson = '';
  loading = false;
  message = '';
  errorMessage = '';
  parsedUsers: User[] | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.usersJson = e.target?.result as string;
        this.message = 'JSON file loaded. You can edit before submitting.';
        this.errorMessage = '';
        this.parsedUsers = null;
      };
      reader.readAsText(file);
    }
  }

  validateJson() {
    this.errorMessage = '';
    this.parsedUsers = null;
    try {
      const parsed = JSON.parse(this.usersJson);
      if (Array.isArray(parsed)) {
        this.parsedUsers = parsed;
        this.message = `Valid JSON with ${parsed.length} user(s). Ready to submit.`;
      } else {
        this.errorMessage = 'JSON must be an array of user objects.';
      }
    } catch (err) {
      this.errorMessage = 'Invalid JSON format. Please correct it.';
    }
  }

  submit() {
    if (!this.parsedUsers) {
      this.errorMessage = 'Please validate and correct JSON before submitting.';
      return;
    }
    this.loading = true;
    this.message = '';
    this.errorMessage = '';
    this.http.post(`${environment.apiUrl}/auth/register-batch`, this.parsedUsers).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = 'Batch registration successful.';
        this.usersJson = '';
        this.parsedUsers = null;
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.error || 'Batch registration failed.';
      }
    });
  }
}
