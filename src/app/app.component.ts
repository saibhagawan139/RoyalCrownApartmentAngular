import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <rc-header></rc-header>
    <main class="main">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`.main { padding:16px; min-height: calc(100vh - 64px); background: linear-gradient(180deg,#fbfdff,#f7fafc); }`]
})
export class AppComponent {}
