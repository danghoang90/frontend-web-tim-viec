import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MasterComponent} from "./components/master/master.component";
import {LoginComponent} from "./pages/login/login.component";
import {LoginEmployersComponent} from "./pages/login-employers/login-employers.component";
import {RegisterComponent} from "./pages/register/register.component";
import * as path from "path";
import {RegisterEmployersComponent} from "./pages/register-employers/register-employers.component";
import {MasterAdminComponent} from "./admin/layout/master-admin/master-admin.component";

const routes: Routes = [
  {
    path: '',
    component: MasterComponent,

  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'login-employer',
    component: LoginEmployersComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
    path: 'register-employer',
    component: RegisterEmployersComponent
  },
  {
    path: 'admin',
    component: MasterAdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
