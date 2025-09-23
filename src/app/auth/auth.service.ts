// import { Injectable, inject, PLATFORM_ID } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { isPlatformBrowser } from '@angular/common';

// interface LoginResponse {
//   token: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:8080/auth'; // Change as needed
//   private tokenKey = 'jwt_token';
//   private platformId = inject(PLATFORM_ID);

//   private currentUserRoleSubject = new BehaviorSubject<string | null>(null);
//   currentUserRole$ = this.currentUserRoleSubject.asObservable();

//   constructor(private http: HttpClient) {
//     if (isPlatformBrowser(this.platformId)) {
//       const token = this.getToken();
//       if (token) {
//         const role = this.parseRoleFromToken(token);
//         this.currentUserRoleSubject.next(role);
//       }
//     }
//   }

//   login(username: string, password: string): Observable<LoginResponse> {
//     return this.http
//       .post<LoginResponse>(`${this.apiUrl}/login`, { username, password })
//       .pipe(
//         tap((response) => {
//           this.storeToken(response.token);
//           const role = this.parseRoleFromToken(response.token);
//           this.currentUserRoleSubject.next(role);
//         })
//       );
//   }

//   logout() {
//     this.removeToken();
//     this.currentUserRoleSubject.next(null);
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }

//   getToken(): string | null {
//     if (isPlatformBrowser(this.platformId)) {
//       return localStorage.getItem(this.tokenKey);
//     }
//     return null;
//   }

//   private storeToken(token: string) {
//     if (isPlatformBrowser(this.platformId)) {
//       localStorage.setItem(this.tokenKey, token);
//     }
//   }

//   private removeToken() {
//     if (isPlatformBrowser(this.platformId)) {
//       localStorage.removeItem(this.tokenKey);
//     }
//   }

//   getUserRole(): string | null {
//     return this.currentUserRoleSubject.value;
//   }

//   private parseRoleFromToken(token: string): string | null {
//     try {
//       const payloadBase64 = token.split('.')[1];
//       const payload = JSON.parse(atob(payloadBase64));
//       return payload.role || null;
//     } catch {
//       return null;
//     }
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../app.config';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'rc_token';
  private userSubject = new BehaviorSubject<{ username: string; role: string } | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const t = this.getToken();
    if (t) {
      const u = this.parseToken(t);
      if (u) this.userSubject.next(u);
    }
  }

  login(username: string, password: string): Observable<void> {
    return this.http.post<{ token: string }>(`${API_BASE}/auth/login`, { username, password })
      .pipe(
        tap(resp => {
          const token = (resp as any).token ?? (resp as any).accessToken ?? resp as any;
          // backend might return raw string; adapt accordingly
          if (!token) { throw new Error('No token received'); }
          localStorage.setItem(this.tokenKey, token);
          const u = this.parseToken(token);
          this.userSubject.next(u);
        }),
        map(() => void 0)
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.userSubject.next(null);
    // optionally call backend logout endpoint
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  currentUser(): Observable<{ username: string; role: string } | null> {
    return this.userSubject.asObservable();
  }

  getCurrentUserSync() {
    return this.userSubject.value;
  }

  getRole(): string | null {
    const u = this.userSubject.value;
    return u ? u.role : null;
  }

  // Basic JWT decode (no signature check) to get subject and role
  private parseToken(token: string): { username: string; role: string } | null {
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      const username = payload.sub || payload.username || payload.user || null;
      const role = (payload.role || payload.roles || payload.authorities || '').toString().replace('ROLE_', '');
      if (!username) return null;
      return { username, role: (role || '').toUpperCase() };
    } catch (e) {
      return null;
    }
  }

  // fetch profile from backend (if available)
  fetchProfile() {
    if (!this.getToken()) return of(null);
    return this.http.get<any>(`${API_BASE}/auth/me`);
  }

  changePassword(currentPassword: string, newPassword: string) {
    return this.http.post<any>(`${API_BASE}/auth/change-password`, {
      currentPassword, newPassword
    });
  }
}
