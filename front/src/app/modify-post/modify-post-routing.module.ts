import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { ModifyPostComponent } from "./components/modify-post/modify-post.component";

const routes: Routes = [
    { path: ":id", component : ModifyPostComponent, canActivate: [AuthGuard] },
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],

    exports: [
        RouterModule
    ]
})
export class ModifyPostRoutingModule {}