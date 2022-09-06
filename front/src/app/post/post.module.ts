import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './components/post-list/post-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProfilModule } from '../profil/profil.module';
import { RouterModule } from '@angular/router';
import { SinglePostComponent } from './components/single-post/single-post.component';


@NgModule({
  declarations: [
    SinglePostComponent,
    PostListComponent,
  ],

  imports: [
    CommonModule,
    RouterModule,
    ProfilModule,
    SharedModule,
  ],

  exports: [
    SinglePostComponent,
    PostListComponent,
  ]

})
export class PostModule { }
