import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { NewPostComponent } from "./components/new-post/new-post.component";

const routes: Routes = [
    { path: "new", component : NewPostComponent, canActivate: [AuthGuard] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],

    exports: [
        RouterModule
    ]
})
export class CreateNewPostRoutingModule {}