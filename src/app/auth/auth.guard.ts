// import { Injectable, inject } from '@angular/core';
// import {
//   CanActivateFn,
//   Router,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { AuthService } from './auth.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthService);
//   const router = inject(Router);

//   if (!authService.isLoggedIn()) {
//     if (state.url === '/login') {
//       return true; // Allow access to login page
//     }
//     return router.parseUrl('/login'); // Redirect others to login
//   }

//   const expectedRoles = route.data['roles'] as string[];
//   const userRole = authService.getUserRole();

//   if (expectedRoles && userRole && !expectedRoles.includes(userRole)) {
//     return router.parseUrl('/unauthorized'); // Redirect unauthorized
//   }

//   return true; // Allow access if authenticated and authorized
// };
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.auth.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    const expectedRoles: string[] = route.data['roles'] || [];
    const user = this.auth.getCurrentUserSync();
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }
    if (expectedRoles.length === 0) return true;
    if (expectedRoles.map(r => r.toUpperCase()).includes(user.role?.toUpperCase())) {
      return true;
    }
    // unauthorized
    this.router.navigate(['/login']);
    return false;
  }
}
