import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service'; // adjust path

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      currentPassword: this.fb.control<string>('', Validators.required),
      newPassword: this.fb.control<string>('', Validators.required),
    });
  }

  onChangePassword(): void {
    if (this.form.valid) {
      this.auth.changePassword(
        this.form.value.currentPassword ?? '',
        this.form.value.newPassword ?? ''
      ).subscribe({
        next: () => console.log('Password changed successfully'),
        error: (err) => console.error('Error changing password:', err)
      });
    }
  }
}
