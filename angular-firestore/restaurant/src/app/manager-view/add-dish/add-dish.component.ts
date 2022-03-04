import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../../types/dish';
import { DishService } from '../../services/dish.service';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent{

  @Input() hidden = true;

  fileRegex = /([/|.|\w|\s|-])*\.(?:jpg|png|gif)/g;

  addDishForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    cuisine: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    type: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    category: new FormControl("", [Validators.required,  Validators.minLength(2), Validators.maxLength(20)]),
    ingredients: new FormControl("", [Validators.required]),
    amount: new FormControl("", [Validators.required]),
    ordered: new FormControl(0),
    price: new FormControl("", [Validators.required]),
    description: new FormControl(""),
    photos: new FormControl("", [Validators.required, Validators.pattern(this.fileRegex)])
  });

  dishes!: Dish[];
  menuItems: Dish[] = [];
  subscription: any;

  constructor(private dishService: DishService) { }

  onSubmit() {
    console.log(this.addDishForm.value)
    this.dishService.newDish(this.addDishForm.value).then(() =>console.log("Dodano nowe danie"));
    this.addDishForm.reset();
  }

}
