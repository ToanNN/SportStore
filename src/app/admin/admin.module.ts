import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { AuthComponent } from "./auth.component";

let routes = RouterModule.forChild([
    {path:"auth", component: AuthComponent},
    {path:"main", component: AdminComponent},
    {path:"**", component: AuthComponent}
]);

@NgModule({
    imports:[CommonModule, FormsModule, ],
    declarations: [AuthComponent, AdminComponent]
})
export class AdminModule{}