import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productServerUrl = 'http://localhost:4000/products';

  constructor(private http: HttpClient) { }

  getTodayDeals() {
    return this.http.get(this.productServerUrl + '/todayDeals');
  }

  getCategories() {
    return this.http.get(this.productServerUrl + '/categories');
  }

  getSpecificCategory(category: string) {
    return this.http.get(this.productServerUrl + '/categories/' + category);
  }

  getAllProducts() {
    return this.http.get(this.productServerUrl + '/fetchProducts');
  }

  getSpecificProduct(id: number) {
    return this.http.get(this.productServerUrl + '/product/' + id);
  }

  searchProducts(value: string) {
    return this.http.get(this.productServerUrl + '/search/' + value);
  }

}
