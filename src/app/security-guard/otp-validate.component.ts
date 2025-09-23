// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   FormBuilder,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { ApartmentService } from '../shared/apartment.service';

// @Component({
//   selector: 'app-otp-validate',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './otp-validate.component.html',
//   styleUrls: ['./otp-validate.component.scss'],
// })
// export class OtpValidateComponent {
//   otpValidateForm: FormGroup;
//   validationResult: boolean | null = null;
//   error: string | null = null;
//   loading = false;

//   constructor(private fb: FormBuilder, private apartmentService: ApartmentService) {
//     this.otpValidateForm = this.fb.group({
//       flatNo: ['', [Validators.required]],
//       otpCode: ['', [Validators.required]],
//     });
//   }

//   onSubmit(): void {
//     this.error = null;
//     this.validationResult = null;

//     if (this.otpValidateForm.invalid) {
//       return;
//     }

//     this.loading = true;
//     const flatNo: string = this.otpValidateForm.value.flatNo;
//     const otpCode: string = this.otpValidateForm.value.otpCode;

//     this.apartmentService.validateOtp(flatNo, otpCode).subscribe({
//       next: (response) => {
//         this.loading = false;
//         this.validationResult = response.valid;
//       },
//       error: (err: any) => {
//         this.loading = false;
//         this.error = err.error?.error || 'Failed to validate OTP';
//       },
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp-validate',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './otp-validate.component.html',
  styleUrls: ['./otp-validate.component.css']
})
export class OtpValidateComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      otp: this.fb.control<string>('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onValidate(): void {
    if (this.form.valid) {
      console.log('Validating OTP', this.form.value.otp);
    }
  }
}
