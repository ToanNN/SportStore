import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthComponent } from './auth.component';

//Define  the routing configuration for this feature module
let routes = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
  { path: 'main', component: AdminComponent },
  { path: '**', redirectTo: "auth" },
]);

// This is a dynamic module. It is important that there is no other modules depending on the classes of this module
@NgModule({
  imports: [CommonModule, FormsModule, routes],
  declarations: [AuthComponent, AdminComponent],
})
export class AdminModule { }
