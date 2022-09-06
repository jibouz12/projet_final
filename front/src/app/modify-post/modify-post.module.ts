import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ModifyPostComponent } from './components/modify-post/modify-post.component';
import { ModifyPostRoutingModule } from './modify-post-routing.module';



@NgModule({
  declarations: [
    ModifyPostComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    ModifyPostRoutingModule,
  ],

  exports: [
    ModifyPostComponent
  ]

})
export class ModifyPostModule { }
