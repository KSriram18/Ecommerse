import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-specific-product',
  templateUrl: './specific-product.component.html',
  styleUrls: ['./specific-product.component.css']
})
export class SpecificProductComponent implements OnInit {

  product: any;
  images: any;
  menuItems: MenuItem[] = [];
  image: any;
  productData: any
  keys: any
  values: any

  constructor(private service: ProductService, private router: ActivatedRoute, private cart: CartService) { }

  ngOnInit() {

    this.router.params.subscribe((params: any) => {
      this.menuItems.push({ label: 'Products', routerLink: '/products' })
      this.service.getSpecificProduct(params.id).subscribe((data: any) => {
        this.productData = data.data.slice()
        this.product = data.data
        this.image = this.product[0].images[0]
        const a: { image: any; thumbnail: any; alt: any; title: any; }[] = [];

        this.product[0].images.map((value: any) => a.push({ image: value, thumbnail: this.product[0].thumbnail, alt: this.product[0].title, title: this.product[0].title }))

        if (a.length > 1)
          a.pop();

        this.images = a;

        this.keys = Object.keys(this.product[0])
        this.keys.splice(this.keys.indexOf('images'), 1);
        this.keys.splice(this.keys.indexOf('thumbnail'), 1);
        this.keys.splice(this.keys.indexOf('pngIcon'), 1);
        this.keys.splice(this.keys.indexOf('id'), 1);

        // delete this.product[0].images;
        // delete this.product[0].thumbnail;
        // delete this.product[0].pngIcon
      })
    })
  }

  addToCart(value: any) {
    this.cart.addToCart(value)
  }

}
