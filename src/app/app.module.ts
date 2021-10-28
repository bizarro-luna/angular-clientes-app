import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import {registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-MX'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { AuthInterceptor } from './interceptor/auth.interceptor';




//Internacionalizacion
registerLocaleData(localeEs,'es-MX');

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
     {provide: LOCALE_ID, useValue: 'es-MX' },
     //Este interceptor sirve para agregar el token a todas las cabeceras
     { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
     //Este interceptor funciona para saber si el back end repondio con 401 0 403
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
