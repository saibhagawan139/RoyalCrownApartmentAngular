import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../app.config';

@Component({
  selector: 'app-otp-validate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './otp-validate.component.html',
  styleUrls: ['./otp-validate.component.scss']
})
export class OtpValidateComponent {
  flatNo = '';
  otpCode = '';
  resultMessage = '';
  errorMessage = '';
  loading = false;

  constructor(private http: HttpClient) {}

  validateOtp() {
    this.errorMessage = '';
    this.resultMessage = '';
    if (!this.flatNo || !this.otpCode) {
      this.errorMessage = 'Flat number and OTP code are required.';
      return;
    }
    this.loading = true;
    this.http.post<{ valid: boolean }>(`${environment.apiUrl}/otp/validate`, { flatNo: this.flatNo, otpCode: this.otpCode }).subscribe({
      next: res => {
        this.loading = false;
        if (res.valid) {
          this.resultMessage = 'OTP validated successfully.';
        } else {
          this.errorMessage = 'OTP validation failed.';
        }
      },
      error: err => {
        this.loading = false;
        this.errorMessage = err.error?.error || 'OTP validation error.';
      }
    });
  }
}
