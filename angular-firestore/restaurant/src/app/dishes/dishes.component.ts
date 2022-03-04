import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Dish } from '../types/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  
  dishes: Dish[] = [];

  biggestPrice!: Dish;
  smallPrice!: Dish;
  
  ngOnInit(): void { }

  constructor(
    private dishService: DishService) { 
      this.dishService.getAllDishes().snapshotChanges().pipe(
        map(changes => changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() })))

      ).subscribe(dishes => {
        this.dishes = (<Dish[]>dishes);
        this.biggestPrice = this.dishes.sort((a, b)=>(a.price-b.price))[this.dishes.length-1];
        this.smallPrice = this.dishes.sort((a, b)=> (a.price-b.price))[0];
      });
  }

  setDish(dish: Dish) {
    this.dishService.setDish(dish);
  }
}
