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
  {
    path: 'admin-dashboard',
    loadComponent: () => import('./admin/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [AuthGuard],
    data: { roles: ['PRESIDENT', 'ADMIN'] }
  },
  {
    path: 'admin/flats',
    loadComponent: () => import('./admin/flat-management.component').then(m => m.FlatManagementComponent),
    canActivate: [AuthGuard],
    data: { roles: ['PRESIDENT', 'ADMIN'] }
  },
  {
      path: 'admin/visits',
      loadComponent: () => import('./admin/visit-log.component').then(m => m.VisitLogComponent),
      canActivate: [AuthGuard],
      data: { roles: ['PRESIDENT', 'ADMIN'] }
    },
  {
    path: 'admin/users',
    loadComponent: () => import('./admin/user-management.component').then(m => m.UserManagementComponent),
    canActivate: [AuthGuard],
    data: { roles: ['PRESIDENT', 'ADMIN'] }
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

export const appRoutingModule = provideRouter(
  routes,
  withPreloading(PreloadAllModules)
);
