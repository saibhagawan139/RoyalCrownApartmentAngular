import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="logo">Royal Crown Apartment</div>
      <nav *ngIf="auth.isLoggedIn()">
        <a routerLink="/" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact:true}">Home</a>
        <a *ngIf="auth.hasRole('OWNER') || auth.hasRole('TENANT')" routerLink="/owner-tenant" routerLinkActive="active-link">Generate OTP</a>
        <a *ngIf="auth.hasRole('SECURITY_GUARD')" routerLink="/security-guard" routerLinkActive="active-link">Validate OTP</a>
        <a (click)="logout()" class="logout-link">Logout</a>
      </nav>
      <nav *ngIf="!auth.isLoggedIn()">
        <a routerLink="/login">Login</a>
      </nav>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      background-color: #3f51b5;
      color: white;
      padding: 12px 24px;
      align-items: center;
      font-weight: 700;
    }
    .logo {
      font-size: 1.5em;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    nav a {
      margin-left: 15px;
      color: white;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;
    }
    nav a.active-link {
      text-decoration: underline;
    }
    .logout-link:hover {
      text-decoration: underline;
    }
  `]
})
export class HeaderComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
