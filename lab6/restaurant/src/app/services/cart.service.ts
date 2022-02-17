import { Injectable, OnInit } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import firestore from 'firebase/compat/app'
import { BehaviorSubject, map } from "rxjs";
import { Dish } from "../types/dish";
import { CartElement } from "../types/cartElement";
import { AuthService } from "./auth.service";


@Injectable()
export class CartService implements OnInit {

    dishes!: Dish[];
    
    cartElements: CartElement[] = [];
    private elementsSource = new BehaviorSubject(this.cartElements);
    currentElements = this.elementsSource.asObservable();

    private carts: AngularFirestoreCollection<any>
    userid: string = "";
    subscription: any;

    constructor( private authService: AuthService, private db: AngularFirestore) {
        this.carts = db.collection("carts");

        this.authService.userData.subscribe(user => { this.userid = user!.uid;
                                                        let cartID = localStorage.getItem('cartID');
                                                        if (!cartID) {
                                                            localStorage.setItem('cartID', this.userid);
                                                            this.carts.doc(this.userid).set({});
                                                        }
        });
    }

    ngOnInit() { }

    getCartID() {
        let cartID = localStorage.getItem('cartID');
        return cartID!;
    }

    async getCartElements() {
        let cartID = this.getCartID();
        const elementsRef = this.db.collection("carts").doc(cartID).collection("cartElements");
        return elementsRef;
    }

    async checkCart(dish: Dish ) {
        const cartID = this.getCartID();
        const elements = this.db.collection("carts").doc(cartID).collection("cartElements");
        let isAny = false;

        await elements.doc(dish.key).get().pipe(map(snapshot => {return snapshot.exists;})).forEach(el => isAny = el);
        return isAny;
    }

    add(dish: Dish) {
        const cartID = this.getCartID();
        const elements = this.db.collection("carts").doc(cartID).collection("cartElements");

        elements.doc(dish.key).get().pipe(map(snapshot => {return snapshot.exists;})).subscribe(exist => {
                            if (exist) {
                                elements.doc(dish.key).update({ dish: dish, quantity: firestore.firestore.FieldValue.increment(1) });
                            }
                            else {
                                elements.doc(dish.key).set({ dish: dish, quantity: 1 });
                            }
        });
    }

    remove(dish: Dish) {
        const cartID = this.getCartID();
        const elements = this.db.collection("carts").doc(cartID).collection("cartElements");

        elements.doc(dish.key).get().pipe(map(snapshot => {return snapshot.data();})).subscribe(data => {
                            if (data != null) {
                                if (data["quantity"] > 1) {
                                    elements.doc(dish.key).update({ dish: dish, quantity: firestore.firestore.FieldValue.increment(-1) });
                                }
                                else {
                                    elements.doc(dish.key).delete();            
                                }
                            }
        });        
    }
}
