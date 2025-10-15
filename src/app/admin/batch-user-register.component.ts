import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../app.config';

interface BatchUser {
  username: string;
  name: string;
  role: string;
  flatNo: string;
  password: string;
  active?: boolean;
}

@Component({
  selector: 'app-batch-user-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './batch-user-register.component.html',
  styleUrls: ['./batch-user-register.component.scss']
})
export class BatchUserRegisterComponent {
  users: BatchUser[] = [
    { username: '', name: '', role: '', flatNo: '', password: '' }
  ];
  loading = false;
  error = '';
  success = '';

  constructor(private http: HttpClient) {}

  addUserRow() {
    this.users.push({ username: '', name: '', role: '', flatNo: '', password: '' });
  }

  removeUserRow(idx: number) {
    if (this.users.length > 1) {
      this.users.splice(idx, 1);
    }
  }

  registerBatch() {
    this.error = '';
    this.success = '';
    this.loading = true;

    // Validate input
    for (const user of this.users) {
      if (!user.username || !user.name || !user.role || !user.flatNo || !user.password) {
        this.error = 'All fields are required for all users.';
        this.loading = false;
        return;
      }
    }

    // Payload expected by backend: each user object should have password as passwordHash
    const payload = this.users.map(u => ({
      ...u,
      passwordHash: u.password,
      active: u.active !== false // default true
    }));

    this.http.post(`${environment.apiUrl}/admin/user/register-batch`, payload).subscribe({
      next: () => {
        this.success = 'Batch registration successful!';
        this.loading = false;
        this.users = [{ username: '', name: '', role: '', flatNo: '', password: '' }];
      },
      error: err => {
        this.error = err.error?.error || 'Batch registration failed';
        this.loading = false;
      }
    });
  }
}
