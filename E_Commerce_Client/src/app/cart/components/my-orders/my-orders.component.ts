import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CartService } from '../../cart.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class MyOrdersComponent implements OnInit {

  menuItems: MenuItem[] = [
    { label: 'My Orders', routerLink: '' }
  ]

  errorMessage = '';
  totalCost = 0;
  public classObj: any = { card: true, 'mt-3': true };
  disabled = false;
  orders: any;

  constructor(private cart: CartService, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.cart.getAllOrders().subscribe(data => { this.orders = data; if (this.orders.length === 0) this.errorMessage = 'You haven\'t placed any orders 😥'; }, () => {
      this.errorMessage = 'You haven\'t placed any orders 😥';
    })
  }

  confirm(value: any) {
    this.confirmationService.confirm({
      message: `<span style="line-height: 1.5em;
      margin: 0 0 1.5em 0;
      padding: 0;border: 0;
      outline: 0;
      font-size: 100%;
      font-weight: normal;
      font-style: normal;
      vertical-align: baseline;
      background: transparent;">We hope you will be pleased with your purchase. Should you wish to return anything bought from us, we will be happy to refund or exchange a product provided it is in a fully resalable condition. Returns should be made within a resalable time (7 days) and in original, undamaged packaging. If we find that the product has not been returned us in fully resalable condition, we reserve the right to refuse a refund on the item If you are returning an item because of an error on our part or because it is damaged or defective, we will refund the delivery charges incurred in sending the item to you and pay your costs of returning it to us.</span>`,
      header: 'Return Item (Policy)',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cart.deleteOrder(value).subscribe((data) => {
          if (data) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Refund will be initiated once we receive the product !' });
            this.ngOnInit()
          }
        }, (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 1500 })
        })
        // this.router.navigateByUrl('cart/checkout')
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
