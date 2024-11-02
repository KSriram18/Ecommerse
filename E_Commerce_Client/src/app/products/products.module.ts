import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { SpecificCategoryComponent } from './components/specific-category/specific-category.component';
import { SharedModule } from '../shared/shared.module';
import { SpecificProductComponent } from './components/specific-product/specific-product.component';
import { SearchProductsComponent } from './components/search-products/search-products.component';


@NgModule({
  declarations: [
    AllProductsComponent,
    SpecificCategoryComponent,
    SpecificProductComponent,
    SearchProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
