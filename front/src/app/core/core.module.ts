import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';




@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],

  imports: [
    CommonModule,
    RouterModule,
  ],

  exports: [
    HeaderComponent,
    FooterComponent,
  ],

  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR'},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ]
})


export class CoreModule { 
  constructor() {
    registerLocaleData(fr.default);
  }
}
