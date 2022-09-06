import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { ProfilUserComponent } from "./components/profil-user/profil-user.component";
import { ProfilComponent } from "./components/profil/profil.component";

const routes: Routes = [
    { path: ":id", component : ProfilUserComponent, canActivate: [AuthGuard]},
    { path: "", component : ProfilComponent, canActivate: [AuthGuard]},
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],

    exports: [
        RouterModule
    ]
})
export class ProfilRoutingModule {}