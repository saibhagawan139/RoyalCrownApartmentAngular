// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   FormBuilder,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { ApartmentService } from '../shared/apartment.service';

// interface OtpResponse {
//   otpCode: string;
//   expiresAt: string;
// }

// @Component({
//   selector: 'app-otp-generate',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './otp-generate.component.html',
//   styleUrls: ['./otp-generate.component.scss'],
// })
// export class OtpGenerateComponent {
//   otpForm: FormGroup;
//   generatedOtp: string | null = null;
//   expiresAt: string | null = null;
//   error: string | null = null;
//   loading = false;

//   guestTypes = ['VISITOR', 'DELIVERY', 'SERVICE', 'OTHER'];

//   constructor(private fb: FormBuilder, private apartmentService: ApartmentService) {
//     this.otpForm = this.fb.group({
//       guestType: ['', [Validators.required]],
//     });
//   }

//   onSubmit(): void {
//     this.error = null;
//     this.generatedOtp = null;
//     this.expiresAt = null;

//     if (this.otpForm.invalid) {
//       return;
//     }

//     this.loading = true;
//     const guestType: string = this.otpForm.value.guestType;
//     this.apartmentService.generateOtp(guestType).subscribe({
//       next: (response: OtpResponse) => {
//         this.loading = false;
//         this.generatedOtp = response.otpCode;
//         this.expiresAt = response.expiresAt;
//       },
//       error: (err: any) => {
//         this.loading = false;
//         this.error = err.error?.error || 'Failed to generate OTP';
//       },
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp-generate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp-generate.component.html',
  styleUrls: ['./otp-generate.component.css']
})
export class OtpGenerateComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      emailOrPhone: this.fb.control<string>('', Validators.required),
    });
  }

  onGenerate(): void {
    if (this.form.valid) {
      console.log('OTP generated for', this.form.value.emailOrPhone);
    }
  }
}
