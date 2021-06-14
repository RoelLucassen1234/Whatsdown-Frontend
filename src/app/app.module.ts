import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NotifierModule } from 'angular-notifier';
import { AuthInterceptor } from './helpers/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NotifierModule
  ],
  providers: [ {provide: LocationStrategy, useClass: HashLocationStrategy},
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
