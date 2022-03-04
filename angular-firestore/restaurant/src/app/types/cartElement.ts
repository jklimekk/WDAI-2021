import { Dish } from "./dish";

export interface CartElement {
    key: string;
    dish: Dish;
    quantity: number;
}