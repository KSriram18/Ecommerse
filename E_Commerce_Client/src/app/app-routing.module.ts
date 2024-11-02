import { NgModule } from '@angular/core';
import { RouterModule, Routes,ExtraOptions } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenticationGuard } from './shared/guards/authentication.guard';
import { ContactComponent } from './contact/contact.component';

const extraOptions:ExtraOptions = {
  anchorScrolling: 'enabled',
  scrollPositionRestoration:'enabled',
  onSameUrlNavigation:'reload'
}

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'user', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path:'contact',component:ContactComponent},
  { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule), canLoad: [AuthenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,extraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
