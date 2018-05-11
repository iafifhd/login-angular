import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';

import { AuthService } from './service/auth.service';

import { AuthGuard } from "./guards/auth.guard";
import { NotAuthGuard } from "./guards/notAuth.guard";

const appRoutes:Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'register',
    component:RegisterComponent,
    canActivate:[NotAuthGuard]
  },
  {
    path:'login',
    component:LoginComponent,
    canActivate:[NotAuthGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'user',
    component:UserComponent,
    canActivate:[AuthGuard]
  },
  {path:'**',component:HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [AuthService,AuthGuard,NotAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
