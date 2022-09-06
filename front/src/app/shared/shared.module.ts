import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimePipe } from './pipes/time.pipe';



@NgModule({
  declarations: [
    PostComponent,
    TimePipe,
  ],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  exports: [
    PostComponent,
    FormsModule,
    ReactiveFormsModule,
    TimePipe,
  ]

})
export class SharedModule { }
