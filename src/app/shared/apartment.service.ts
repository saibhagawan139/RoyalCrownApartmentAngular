import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface OtpResponse {
  otpCode: string;
  expiresAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApartmentService {
  private apiUrl = 'http://localhost:8080'; // Replace with your backend URL if different

  constructor(private http: HttpClient) {}

  generateOtp(guestType: string): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${this.apiUrl}/otp/generate`, { guestType });
  }

  validateOtp(flatNo: string, otpCode: string): Observable<{ valid: boolean }> {
    return this.http.post<{ valid: boolean }>(`${this.apiUrl}/otp/validate`, { flatNo, otpCode });
  }
}
