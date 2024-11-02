import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { CartService } from '../../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class CartComponent implements OnInit {

  menuItems: MenuItem[] = [
    { label: 'Cart', routerLink: '' },
  ]

  products: any;
  productsData: any[] = [];
  errorMessage = '';
  totalCost = 0;
  public classObj: any = { card: true, 'mt-3': true };
  disabled = false;

  constructor(private service: CartService, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.disabled = false;
    // this.ar.params.subscribe((data: any) => {
    //   this.service.getSpecificProduct(data.id).subscribe((data: any) => {
    //     this.products.push(data.data)
    //     console.log(this.products)
    //   })
    // })
    this.errorMessage = ''

    this.service.getCart().subscribe(data => {
      this.totalCost = 0
      this.productsData = []
      this.products = data
      if (this.products.length === 0) {
        this.errorMessage = 'Nothing in cart 😒';
      }
      else {
        const uniqueProducts = new Set(this.products.map((val: any) => val.id))
        uniqueProducts.forEach((val: any) => {
          this.productsData.push(this.service.uniqueProduct(val))
        })
        this.calculateTotalCost();
        this.service.calculateTotalCost();
        this.errorMessage = ''
      }
    })

    this.service.cart = this.productsData;
    this.service.getCartObservable.next(this.service.cart);
    this.service.cartLength.next(this.service.cart.length);

  }

  calculateTotalCost() {
    this.totalCost = 0;
    this.productsData.forEach(val => {
      this.totalCost += (Math.round((val.price * (1 - (val.discountPercentage / 100)))) * val.quantity)
    })
  }

  removeFromCart(id: number) {
    this.service.removeFromCart(id)
  }

  updateQuantity(index: any, value: string, stock: number) {
    if (parseInt(value) <= stock && parseInt(value) != 0) {
      this.disabled = false
      this.productsData[index].quantity = parseInt(value);
      this.service.cart = this.productsData;
      this.service.getCartObservable.next(this.service.cart);
      this.service.cartLength.next(this.service.cart.length);
      this.calculateTotalCost()
    }
    else {
      this.disabled = true;
    }
  }

  confirm() {
    this.confirmationService.confirm({
      message: `Total ${this.productsData.length} products worth <b>$${this.totalCost}.00</b>`,
      header: 'Place your oder?',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.router.navigateByUrl('cart/checkout')
        // this.service.createOrder(this.service.cart).subscribe(() => {
        //   this.service.removeAllInCart();
        //   this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Order Placed Successfully' });
        // }, err => {
        //   this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 1500 })
        // })
      },

    });
  }

}
