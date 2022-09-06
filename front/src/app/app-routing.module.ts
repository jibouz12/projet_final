import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PostListComponent } from './post/components/post-list/post-list.component';
import { SinglePostComponent } from './post/components/single-post/single-post.component';

const routes: Routes = [
  { path: "profil", loadChildren: () => import("./profil/profil.module").then(m => m.ProfilModule) },
  { path: "modify", loadChildren: () => import("./modify-post/modify-post.module").then(m => m.ModifyPostModule) },
  { path: "create", loadChildren: () => import("./create-new-post/create-new-post.module").then(m => m.CreateNewPostModule) },
  { path: "auth", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule) },
  { path: "", component: PostListComponent, canActivate: [AuthGuard] },
  { path: ":id", component : SinglePostComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
