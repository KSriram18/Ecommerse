import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { CartService } from './cart/cart.service';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class AppComponent implements OnInit {

  title = 'E_Commerce_Client';
  isLoggedIn!: boolean;
  cartLength = 0;
  searchValue = ''

  constructor(private router: Router, private loginService: LoginService, private cart: CartService,private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit() {

    this.loginService.getLoggedInStatus().subscribe(data => {
      this.isLoggedIn = data;
      if (localStorage.getItem('token')) {
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
    });

    this.cart.cartLength.asObservable().subscribe(data => {
      this.cartLength = data;
    })

  }

  login() {
    this.router.navigateByUrl('/user')
  }

  logout() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to logout?',
      header: 'Logout Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Logout successfull' });
          localStorage.removeItem('token');
          this.cart.removeAllInCart();
          this.loginService.isLoggedIn.next(false);
      },
      // reject: (type) => {
      //     switch (type: ConfirmEventType) {
      //         case ConfirmEventType.REJECT:
      //             this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      //             break;
      //         case ConfirmEventType.CANCEL:
      //             this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
      //             break;
      //     }
      // }
  });
    
  }

  goToSearchProducts() {
    this.router.navigate(['products/search/', this.searchValue])
  }

  goToCart() {
    this.router.navigateByUrl('cart')
  }

  goToMyOrders() {
    this.router.navigateByUrl('cart/myOrders')
  }
}
