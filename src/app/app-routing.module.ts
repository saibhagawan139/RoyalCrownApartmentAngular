import { Routes } from '@angular/router';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'owner-tenant',
    loadComponent: () => import('./owner-tenant/otp-generate.component').then(m => m.OtpGenerateComponent),
    canActivate: [AuthGuard],
    data: { roles: ['OWNER', 'TENANT'] }
  },
  {
    path: 'security-guard',
    loadComponent: () => import('./security-guard/otp-validate.component').then(m => m.OtpValidateComponent),
    canActivate: [AuthGuard],
    data: { roles: ['SECURITY_GUARD'] }
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

export const appRoutingModule = provideRouter(
  routes,
  withPreloading(PreloadAllModules)
);
