import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../types/dish';
import { DishService } from '../services/dish.service';
import { CartService } from '../services/cart.service';
import { Review } from '../types/review';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviewsList: Review[] = [];
  dish!: Dish;
  subscription: any;

  @Output() counterChange = new EventEmitter<number>();

  addReviewForm = new FormGroup({
    name: new FormControl("", Validators.required),
    title: new FormControl("", Validators.required),
    content: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    date: new FormControl()
  });


  constructor(private reviewService: ReviewService, private dishService: DishService, private cartService: CartService) { }

  ngOnInit(): void {
    this.dish = this.dishService.dish;
    this.reviewService.setReviews(this.dish);

    this.subscription = this.reviewService.getReviews().valueChanges().subscribe(reviews => {
                                                                                  this.reviewsList = <Review[]> reviews;
                                                                                  this.counterChange.emit(this.reviewsList.length);
                                                                                });
  }

  onSubmit() {
    this.cartService.checkCart(this.dish).then(exists => {
      if(exists) {
        this.reviewService.new(this.addReviewForm.value, this.dish);
        this.addReviewForm.reset();

      } else {
        alert("Opinie można wystawić tylko na temat wybranych wcześniej dań.")
      }
    });
  }
}
