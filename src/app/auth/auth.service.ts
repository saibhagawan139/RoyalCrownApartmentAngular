
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../app.config';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'royalCrownToken';
  private roleKey = 'royalCrownRole';
  private usernameKey = 'royalCrownUsername';

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, { username, password }).pipe(
      tap(res => {
        this.storeToken(res.token);
        this.loggedInSubject.next(true);
      })
    );
  }

  private storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    const payload = JSON.parse(atob(token.split('.')[1]));
    localStorage.setItem(this.roleKey, payload.role);
    localStorage.setItem(this.usernameKey, payload.sub);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.usernameKey);
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  hasRole(role: string): boolean {
    const userRole = localStorage.getItem(this.roleKey);
    return userRole ? userRole.toUpperCase() === role.toUpperCase() : false;
  }

  loadUserProfile(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/auth/me`);
  }
}

interface User {
  username: string;
  flatNo: string;
  role: string;
}
