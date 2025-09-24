import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.errorMessage = '';
    this.loading = true;
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        // Navigate based on role
        if (this.auth.hasRole('OWNER') || this.auth.hasRole('TENANT')) {
          this.router.navigate(['/owner-tenant']);
        } else if (this.auth.hasRole('SECURITY_GUARD')) {
          this.router.navigate(['/security-guard']);
        } else {
          this.errorMessage = 'Unauthorized role';
          this.auth.logout();
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.error || 'Login failed. Check credentials.';
      }
    });
  }
}
