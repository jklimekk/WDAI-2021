import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Dish } from '../types/dish';
import { DishService } from '../services/dish.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @Input() currentDish!: Dish;
  counter!: number;

  constructor( private dishService: DishService, private cartService: CartService) { }

  ngOnInit(): void { }

  addDish(dish: Dish) {
    if (dish.amount - dish.ordered > 0) {
      dish.ordered += 1;
      this.cartService.add(dish);
      this.dishService.updateDish(dish.key, dish)
    }
  }

  deleteDish(dish: Dish) {
    if (dish.ordered > 0) {
      this.cartService.remove(dish);
      
      this.cartService.checkCart(dish).then(isAnyDishLeft => {
        if (isAnyDishLeft) {
          dish.ordered -= 1;
          this.dishService.updateDish(dish.key, dish)
        }
      });
    }
  }
}

