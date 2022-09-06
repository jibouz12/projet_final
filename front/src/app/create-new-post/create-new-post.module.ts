import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from './components/new-post/new-post.component';
import { SharedModule } from '../shared/shared.module';
import { CreateNewPostRoutingModule } from './create-new-post-routing.module';


@NgModule({
  declarations: [
    NewPostComponent
  ],

  imports: [
    CommonModule,
    SharedModule,
    CreateNewPostRoutingModule,
    
  ],

  exports: [
    NewPostComponent
  ]

})
export class CreateNewPostModule { }
