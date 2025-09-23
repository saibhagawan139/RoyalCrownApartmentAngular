// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';

// import { authGuard } from './auth/auth.guard';
// import { LoginComponent } from './auth/login.component';
// import { OtpGenerateComponent } from './owner-tenant/otp-generate.component';
// import { OtpValidateComponent } from './security-guard/otp-validate.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
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
//   { path: '**', redirectTo: '/login' }, // fallback route
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
