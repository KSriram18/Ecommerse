import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { ProductService } from '../../product.service';
import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})

export class AllProductsComponent implements OnInit {

  @ViewChild('dv') dataView: any;

  menuItems: MenuItem[] = [
    { label: 'All Products', routerLink: '' }
  ]

  products: any;

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;

  constructor(private productService: ProductService, private primengConfig: PrimeNGConfig, private router: Router, private cart: CartService) { }

  ngOnInit() {
    this.productService.getAllProducts().subscribe((data: any) => this.products = data.data);

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];
    this.primengConfig.ripple = true;
  }

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  filter(value: any) {
    this.dataView.filter(value.target.value)
  }

  rating(num: number): number {
    return Math.round(num)
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

  goToSpecificProduct(id: number) {
    this.router.navigateByUrl('products/product/' + id)
  }

  addToCart(value: any) {
    this.cart.addToCart(value);
  }

}
