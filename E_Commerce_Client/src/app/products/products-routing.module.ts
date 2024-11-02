import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { SpecificCategoryComponent } from './components/specific-category/specific-category.component';
import { SpecificProductComponent } from './components/specific-product/specific-product.component';
import { SearchProductsComponent } from './components/search-products/search-products.component';

const routes: Routes = [
  { path: '', component: AllProductsComponent, pathMatch: 'full' },
  { path: 'category/:category', component: SpecificCategoryComponent },
  { path: 'product/:id', component: SpecificProductComponent },
  { path: 'search/:value', component: SearchProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
