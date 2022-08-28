import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PublicComponent} from "./public/public.component";
import {LoginComponent} from "./public/components/login/login.component";
import {PrivateComponent} from "./private/private.component";
import {AuthorizationGuard} from "./core/guard/authorization.guard";
import {RegisterComponent} from "./public/components/register/register.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: '',
    component: PublicComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      requiredAuth: false
    },
    canActivate: [AuthorizationGuard]
  },
  {
    path: 'home',
    component: PrivateComponent,
    data: {
      requiredAuth: true
    },
    canActivate: [AuthorizationGuard]
  },
  {
    path: '**',
    redirectTo: '/',
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
