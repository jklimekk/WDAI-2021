import { Injectable } from "@angular/core";
import { AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import firestore from 'firebase/compat/app';
import { BehaviorSubject, map } from "rxjs";
import { Dish } from "../types/dish";
import { Review } from "../types/review";
import { DishService } from "./dish.service";
import { AuthService } from "./auth.service";

@Injectable()
export class ReviewService {
    reviews: any;
    userid!: string;

    constructor(private dishService: DishService, private authService: AuthService){
        this.authService.userData.subscribe(user => {this.userid = user!.uid;});
    }

    new(review: Review, dish: Dish) {
        return this.reviews.doc(this.userid).get().pipe(map((snapshot: firestore.firestore.DocumentSnapshot<firestore.firestore.DocumentData>) => {
            return snapshot.exists;
        })).subscribe((exist: boolean) => { if (!exist) {
                                                this.reviews.doc(this.userid).set({...review});
                                                let a = dish;
                                                this.dishService.updateDish(dish.key, a)
                                            } else {
                                                console.log("You've already created a review");
                                            }
        });
    }

    setReviews(dish: Dish) {
        this.reviews = this.dishService.getDishDocument(dish.key).collection('reviews');
    }

    getReviews(): AngularFirestoreCollection {
        return this.reviews;
    }
    
}