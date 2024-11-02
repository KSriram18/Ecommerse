import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {

  menuItems: MenuItem[] = [
    { label: 'Search Products', routerLink: '' }
  ]
  products: any;
  sort = '';
  searchValue!: string;
  errorMessage!: string;

  constructor(private service: ProductService, private router: ActivatedRoute, private route: Router, private cart: CartService) { }

  ngOnInit() {
    this.errorMessage = '';
    this.router.params.subscribe((data: any) => {
      this.searchValue = data.value;
      this.products = [];
      this.service.searchProducts(this.searchValue).subscribe((response: any) => {
        this.errorMessage = '';
        this.products = response.data;
      }, (err: any) => {
        this.errorMessage = err.error.message;
      })
    })
  }

  rating(value: number): number {
    return Math.round(value)
  }

  goToSpecificProduct(id: number) {
    this.route.navigateByUrl('products/product/' + id)
  }

  addToCart(value: any) {
    this.cart.addToCart(value)
  }

}
