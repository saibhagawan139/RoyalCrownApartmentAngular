// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule, Router } from '@angular/router';
// import { AuthService } from '../auth/auth.service';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.scss'],
// })
// export class HeaderComponent {
//   appName = 'Royal Crown Apartment';
//   userRole: string | null = null;

//   constructor(private authService: AuthService, private router: Router) {
//     this.authService.currentUserRole$.subscribe((role) => {
//       this.userRole = role;
//     });
//   }

//   logout(): void {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }
// }
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'rc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user: { username: string; role: string } | null = null;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.currentUser().subscribe(u => this.user = u);
  }

  logout() {
    this.auth.logout();
  }
}
