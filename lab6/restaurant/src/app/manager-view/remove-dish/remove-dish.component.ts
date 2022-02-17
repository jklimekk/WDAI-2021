import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Dish } from '../../types/dish';
import { DishService } from '../../services/dish.service';

@Component({
  selector: 'app-remove-dish',
  templateUrl: './remove-dish.component.html',
  styleUrls: ['./remove-dish.component.css']
})
export class DeleteDishComponent implements OnInit {

  @Input() dish!: Dish;
  @Output() itemRemoved = new EventEmitter<Dish>();
  
  constructor(private dishService: DishService) { }

  ngOnInit(): void { }

  deleteDish() {
    this.dishService.removeDish(this.dish.key).then(m => {
      console.log("Danie zostało usunięte");
    });

    this.itemRemoved.emit(this.dish);
  }
}
