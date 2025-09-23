// import { Routes } from '@angular/router';

// import { LoginComponent } from './auth/login.component';
// import { OtpGenerateComponent } from './owner-tenant/otp-generate.component';
// import { OtpValidateComponent } from './security-guard/otp-validate.component';
// import { authGuard } from './auth/auth.guard';

// export const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent }, // No guard here!
//   {
//     path: 'owner-tenant/otp-generate',
//     component: OtpGenerateComponent,
//     canActivate: [authGuard],
//     data: { roles: ['OWNER', 'TENANT'] },
//   },
//   {
//     path: 'security-guard/otp-validate',
//     component: OtpValidateComponent,
//     canActivate: [authGuard],
//     data: { roles: ['SECURITY_GUARD'] },
//   },
//   { path: '**', redirectTo: '/login' },
// ];

import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { OtpGenerateComponent } from './owner-tenant/otp-generate.component';
import { OtpValidateComponent } from './security-guard/otp-validate.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'owner',
    component: OtpGenerateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['OWNER', 'TENANT'] }
  },
  {
    path: 'security',
    component: OtpValidateComponent,
    canActivate: [AuthGuard],
    data: { roles: ['SECURITY_GUARD'] }
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
