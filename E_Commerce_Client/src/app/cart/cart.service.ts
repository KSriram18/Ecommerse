import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  orderUrl = 'http://localhost:4000/orders'


  cart: any[] = [];
  getCartObservable = new BehaviorSubject<any>([]);
  cartLength = new BehaviorSubject<number>(0);
  totalCost!: number;

  constructor(private http: HttpClient) { }

  getCart() {
    return this.getCartObservable.asObservable()
  }

  calculateTotalCost() {
    this.totalCost = 0;
    this.cart.forEach(val => {
      this.totalCost += (Math.round((val.price * (1 - (val.discountPercentage / 100)))) * val.quantity)
    })
  }

  private countOfIds(ids: any[], value: number) {
    let count = 0;
    for (let i = 0; i < ids.length; i++) {
      if (value == ids[i])
        count += 1;
    }
    return count;
  }

  addToCart(value: any) {
    this.cart.push(value)
    const ids = this.cart.map(val => val.id)
    this.cart.forEach(val => {
      val.quantity = this.countOfIds(ids, val.id)
    })
    this.getCartObservable.next(this.cart);
    const uniqueProducts = new Set(ids)
    this.cartLength.next(uniqueProducts.size);
  }

  removeFromCart(index: number) {
    this.cart = this.cart.filter((val) => val.id !== index)
    this.getCartObservable.next(this.cart);
    this.cartLength.next(this.cart.length);
  }

  uniqueProduct(id: any) {
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].id === id)
        return this.cart[i];
    }
  }

  removeAllInCart() {
    this.cart = [];
    this.getCartObservable.next(this.cart);
    this.cartLength.next(this.cart.length);
  }

  createOrder(value: any) {
    const token = localStorage.getItem('token')
    return this.http.post(this.orderUrl + '/createOrder', { value, token });
  }

  getAllOrders() {
    const token = localStorage.getItem('token');
    return this.http.post(this.orderUrl + '/allOrders', { token });
  }

  deleteOrder(value: any) {
    const token = localStorage.getItem('token');
    return this.http.put(this.orderUrl + '/deleteOrder', { token, value })
  }

}
