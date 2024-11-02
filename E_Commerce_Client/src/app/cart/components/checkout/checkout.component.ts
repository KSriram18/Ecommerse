import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { CartService } from '../../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [MessageService]
})
export class CheckoutComponent implements OnInit {

  menuItems: MenuItem[] = [
    { label: 'Cart', routerLink: '/cart' },
    { label: 'Checkout', routerLink: '' }
  ]

  totalProducts!: number;
  totalCost!: number;

  constructor(private cart: CartService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.totalCost = 0;
    this.cart.cartLength.asObservable().subscribe(data => this.totalProducts = data)
    this.totalCost = this.cart.totalCost;
  }

  addOrder() {
    this.cart.createOrder(this.cart.cart).subscribe(() => {
      this.cart.removeAllInCart();
      this.totalCost = 0;
      this.messageService.add({ severity: 'success', summary: 'Payment Success', detail: 'Order Placed Successfully', life: 1000 });
      setTimeout(() => {
        this.router.navigateByUrl('');
      }, 1500)
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Payment Failure', detail: err.error.message, life: 1500 });
      setTimeout(() => {
        this.router.navigateByUrl('');
      }, 2000)
    })
  }

}
