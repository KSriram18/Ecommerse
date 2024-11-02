import { Router, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { inject } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { QueriesComponent } from './queries/queries.component';

function guard() {
    return localStorage.getItem("adminLoggedIn") === 'true' ? true : inject(Router).navigateByUrl('')
}

export const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'products', component: ProductComponent, canActivate: [() => guard()] },
    { path: 'home', component: HomeComponent, canActivate: [() => guard()] },
    { path: 'users', component: UsersComponent, canActivate: [() => guard()] },
    { path: 'tickets', component: QueriesComponent, canActivate: [() => guard()] }
];
