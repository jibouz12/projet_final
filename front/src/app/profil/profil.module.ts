import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from './components/profil/profil.component';
import { SharedModule } from '../shared/shared.module';
import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilUserComponent } from './components/profil-user/profil-user.component';



@NgModule({
  declarations: [
    ProfilComponent,
    ProfilUserComponent,
  ],

  imports: [
    CommonModule,
    SharedModule,
    ProfilRoutingModule,
  ], 

  exports: [
    ProfilComponent,
    ProfilUserComponent
  ]

})
export class ProfilModule { }
