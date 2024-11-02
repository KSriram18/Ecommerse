import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products/product.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  responsiveOptions !: any[];
  products !: any[];
  categoriesLoaded = false;
  categories !: any[];
  items: MenuItem[] = [
    { label: 'Home Page', routerLink: '/' }
  ]


  constructor(private productService: ProductService, private router: Router, private cart: CartService) { }

  ngOnInit() {

    this.categoriesLoaded = false;

    this.productService.getTodayDeals().subscribe({
      next: (data: any) => {
        this.products = data.data;
      }
    })

    this.productService.getCategories().subscribe({
      next: (data: any) => {
        this.categories = data.data;
        this.categoriesLoaded = true;
      }
    })
  }

  goToSpecificProduct(id: number) {
    this.router.navigateByUrl('products/product/' + id)
  }

  getSeverity(status: number): string {
    switch (status > 50) {
      case true:
        return 'success';
      case false:
        return 'warning';
      // case 'OUTOFSTOCK':
      //   return 'danger';
    }
    return "";
  }

  addToCart(value: any) {
    this.cart.addToCart(value)
  }

}
