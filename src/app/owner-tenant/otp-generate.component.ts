// import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
// import { AuthService } from '../auth/auth.service';
// import { environment } from '../app.config';

// interface User {
//   username: string;
//   flatNo: string;
//   role: string;
// }

// interface OtpEntry {
//   flatNo: string;
//   guestType: string;
//   otpCode: string;
//   issuedAt: string;
//   expiresAt: string;
//   valid: boolean;
// }

// @Component({
//   selector: 'app-otp-generate',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './otp-generate.component.html',
//   styleUrls: ['./otp-generate.component.scss']
// })
// export class OtpGenerateComponent implements OnInit {
//   guestType = '';
//   otpEntry: OtpEntry | null = null;
//   error: string | null = null;
//   loading = false;
//   username = '';
//   flatNo = '';

//   guestTypes = ['VISITOR', 'SERVANT', 'DELIVERY', 'OTHER'];

//   constructor(
//     private http: HttpClient,
//     private auth: AuthService,
//     private cdr: ChangeDetectorRef
//   ) {}

//   ngOnInit() {
//     this.username = this.auth.getUsername() || '';
//     if (this.username) {
//       this.http.get<User>(`${environment.apiUrl}/auth/me`).subscribe({
//         next: (user) => {
//           // flatNo comes from backend and is assigned here
//           this.flatNo = user.flatNo || '';
//           this.cdr.detectChanges();
//         },
//         error: (err) => {
//           this.error = 'Failed to fetch user flat information.';
//           this.cdr.detectChanges();
//         }
//       });
//     }
//   }

//   generateOtp() {
//     this.error = null;
//     this.otpEntry = null;

//     if (!this.guestType) {
//       this.error = 'Please select guest type.';
//       return;
//     }

//     if (!this.flatNo) {
//       this.error = 'Flat number not found.';
//       return;
//     }

//     this.loading = true;

//     // Send both guestType and flatNo in the OTP generation request
//     this.http.post<OtpEntry>(`${environment.apiUrl}/otp/generate`, { guestType: this.guestType, flatNo: this.flatNo }).subscribe({
//       next: (res) => {
//         this.otpEntry = res;
//         this.loading = false;
//         this.cdr.detectChanges();
//       },
//       error: (err) => {
//         this.error = err.error?.error || 'Failed to generate OTP.';
//         this.loading = false;
//         this.cdr.detectChanges();
//       }
//     });
//   }
// }


import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../app.config';

interface User {
  username: string;
  flatNo: string;
  role: string;
}

interface OtpEntry {
  flatNo: string;
  guestType: string;
  otpCode: string;
  issuedAt: string;
  expiresAt: string;
  valid: boolean;
}

@Component({
  selector: 'app-otp-generate',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './otp-generate.component.html',
  styleUrls: ['./otp-generate.component.scss']
})
export class OtpGenerateComponent implements OnInit {
  guestType = '';
  otpEntry: OtpEntry | null = null;
  error: string | null = null;
  loading = false;
  username = '';
  flatNo = '';

  guestTypes = ['VISITOR', 'SERVANT', 'DELIVERY', 'OTHER'];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.username = this.auth.getUsername() || '';
    if (this.username) {
      // Using AuthService’s loadUserProfile ensures token is sent (assuming interceptor configured)
      this.auth.loadUserProfile().subscribe({
        next: (user) => {
          this.flatNo = user.flatNo || '';
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.error = 'Failed to fetch user flat information.';
          this.cdr.detectChanges();
        }
      });
    } else {
      this.error = 'User not logged in.';
    }
  }

  generateOtp() {
    this.error = null;
    this.otpEntry = null;

    if (!this.guestType) {
      this.error = 'Please select guest type.';
      return;
    }

    if (!this.flatNo) {
      this.error = 'Flat number not found.';
      return;
    }

    this.loading = true;

    this.http.post<OtpEntry>(`${environment.apiUrl}/otp/generate`, { guestType: this.guestType, flatNo: this.flatNo }).subscribe({
      next: (res) => {
        this.otpEntry = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to generate OTP.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
