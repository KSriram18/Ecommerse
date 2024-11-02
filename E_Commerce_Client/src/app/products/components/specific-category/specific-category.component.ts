import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-specific-category',
  templateUrl: './specific-category.component.html',
  styleUrls: ['./specific-category.component.css']
})
export class SpecificCategoryComponent implements OnInit {

  category!: string;
  products: any;
  sort = '';
  menuItems: MenuItem[] = [
    { label: 'Categories', routerLink: '/', fragment:'categories',target:'_blank'}
  ]

  constructor(private service: ProductService, private router: ActivatedRoute, private route: Router, private cart: CartService) { }

  ngOnInit() {
    this.router.params.subscribe((data: any) => {
      this.category = data.category
      this.menuItems.push({ label: this.category, routerLink: '' })
      this.service.getSpecificCategory(this.category).subscribe((data: any) => this.products = data.data)
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
