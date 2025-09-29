import 'zone.js';  // This must be the first import in main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appRoutingModule } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { authInterceptor } from './app/auth/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    appRoutingModule
  ]
}).catch(err => console.error(err));


