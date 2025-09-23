import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// auth
import { LoginComponent } from './auth/login.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

// owner/tenant
import { OtpGenerateComponent } from './owner-tenant/otp-generate.component';
import { ChangePasswordComponent } from './owner-tenant/change-password.component';

// security
import { OtpValidateComponent } from './security-guard/otp-validate.component';

// shared
import { HeaderComponent } from './shared/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OtpGenerateComponent,
    ChangePasswordComponent,
    OtpValidateComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
