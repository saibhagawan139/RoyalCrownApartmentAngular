// import { Component } from '@angular/core';
// import {
//   FormBuilder,
//   FormGroup,
//   ReactiveFormsModule,
//   Validators
// } from '@angular/forms';import { Router } from '@angular/router';
// import { AuthService } from './auth.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   loading = false;
//   error: string | null = null;

//   constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
//     this.loginForm = this.fb.group({
//       username: ['', [Validators.required]],
//       password: ['', [Validators.required]],
//     });
//   }

//   onSubmit(): void {
//     this.error = null;
//     if (this.loginForm.invalid) return;

//     this.loading = true;
//     const { username, password } = this.loginForm.value;

//     this.authService.login(username!, password!).subscribe({
//       next: () => {
//         this.loading = false;
//         const role = this.authService.getUserRole();
//         if (role === 'OWNER' || role === 'TENANT') {
//           this.router.navigate(['/owner-tenant/otp-generate']);
//         } else if (role === 'SECURITY_GUARD') {
//           this.router.navigate(['/security-guard/otp-validate']);
//         } else {
//           this.authService.logout();
//           this.error = 'Unauthorized role';
//         }
//       },
//       error: (err) => {
//         this.loading = false;
//         this.error = err.error?.error || 'Login failed';
//       },
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,  // 👈 IMPORTANT
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: this.fb.control<string>('', Validators.required),
      password: this.fb.control<string>('', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
