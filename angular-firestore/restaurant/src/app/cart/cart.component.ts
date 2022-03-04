import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CartElement } from '../types/cartElement';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cartElements!: CartElement[];
  price!: number;
  subscription: any;
  
  constructor(private cartService: CartService) { }
  
  async ngOnInit() {
    this.subscription = (await this.cartService.getCartElements()).snapshotChanges().pipe(
        map(changes => changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() })))).subscribe(elements => {
                                                                                        this.cartElements = <CartElement[]> elements;  
                                                                                        this.price = this.totalPrice(this.cartElements);
    });
  }

  totalPrice(cartElement: CartElement[]) {
    let sum = 0;
    cartElement.forEach(ele => { sum += ele.dish.price * ele.quantity; });
    return sum;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
