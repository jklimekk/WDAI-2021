import { Component, OnInit } from '@angular/core';
import { Dish } from '../../types/dish';
import { DishService } from '../../services/dish.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-dish-page',
  templateUrl: './dish-page.component.html',
  styleUrls: ['./dish-page.component.css']
})
export class DishPageComponent implements OnInit {
  dish!: Dish;
  counter = 0;

  constructor(private dishService: DishService, private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.dish = this.dishService.getDish();
    this.reviewService.setReviews(this.dish);
  }

  setReviewCounter(counter: number) {
    this.counter = counter;
  }

}
