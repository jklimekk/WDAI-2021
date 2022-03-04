import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { DishService } from 'src/app/services/dish.service';
import { Dish } from 'src/app/types/dish';

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent implements OnInit {

  dishes: Dish[] = [];

  subscription: any;
  hidden = true;

  constructor(private dishService: DishService, private cartService: CartService) { }

  ngOnInit(): void {
    this.subscription = this.dishService.getAllDishes().snapshotChanges()
              .pipe(map(changes => changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }))))
              .subscribe(dishes => {this.dishes = (<Dish[]>dishes);});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showAddForm() {
    this.hidden = !this.hidden;
}

  onItemRemoved(dish: Dish) { }

}
