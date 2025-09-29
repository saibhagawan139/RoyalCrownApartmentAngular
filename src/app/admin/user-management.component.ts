import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../app.config';

interface User {
  username: string;
  name: string;
  role: string;
  flatNo: string;
  active: boolean;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';
  flatNoFilter = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.error = '';
    this.loading = true;
    const url = this.flatNoFilter ? `${environment.apiUrl}/admin/user?flatNo=${this.flatNoFilter}` : `${environment.apiUrl}/admin/user`;
    this.http.get<User[]>(url).subscribe({
      next: data => {
        this.users = data;
        this.loading = false;
      },
      error: err => {
        this.error = err.error?.error || 'Failed to load users';
        this.loading = false;
      }
    });
  }

  deleteUser(username: string) {
    if (!confirm(`Delete user '${username}'?`)) return;
    this.http.delete(`${environment.apiUrl}/admin/user/${username}`).subscribe({
      next: () => this.loadUsers(),
      error: err => alert(err.error?.error || 'Delete failed')
    });
  }

  toggleActive(user: User) {
    const newStatus = !user.active;
    this.http.post(`${environment.apiUrl}/admin/user/${user.username}/deactivate`, { active: newStatus }).subscribe({
      next: () => this.loadUsers(),
      error: err => alert(err.error?.error || 'Update failed')
    });
  }
}
