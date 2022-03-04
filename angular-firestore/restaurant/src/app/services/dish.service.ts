import { Injectable } from "@angular/core";
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/compat/firestore'
import { Dish } from "../types/dish";

@Injectable()
export class DishService {
    dish!: Dish;

    private dishes: AngularFirestoreCollection<any>;

    constructor(db: AngularFirestore ) { 
        this.dishes = db.collection('dishes');
    }

    newDish(dish: Dish) {
        return this.dishes.doc().set({...dish});
    }

    updateDish(key: string, value: any) {
        return this.dishes.doc(key).set(value);
    }

    removeDish(key: string) {
        return this.dishes.doc(key).delete();
    }

    setDish(dish: Dish) {
        this.dish = dish;
    }

    getDish() {
        return this.dish;
    }

    getDishDocument(key: string) {
        return this.dishes.doc(key);
    }

    getAllDishes() {
        return this.dishes;
    }

}
