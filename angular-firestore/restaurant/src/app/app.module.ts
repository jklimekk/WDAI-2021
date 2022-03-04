import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './not-found/not-found.component';
import { MenuComponent } from './menu/menu.component';
import { DishesComponent } from './dishes/dishes.component';
import { AddDishComponent } from './manager-view/add-dish/add-dish.component';
import { DeleteDishComponent } from './manager-view/remove-dish/remove-dish.component';
import { DishService } from './services/dish.service';
import { DishPageComponent } from './dishes/dish-page/dish-page.component';
import { ItemsComponent } from './items/items.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewService } from './services/review.service';
import { CartComponent } from './cart/cart.component';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { PersistenceComponent } from './admin-view/persistence/persistence.component';
import { UserService } from './services/user.service';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { ManagerViewComponent } from './manager-view/manager-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    MenuComponent,
    DishesComponent,
    AddDishComponent,
    DeleteDishComponent,
    DishPageComponent,
    ItemsComponent,
    ReviewsComponent,
    CartComponent,
    LoginComponent,
    RegisterComponent,
    PersistenceComponent,
    AdminViewComponent,
    ManagerViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AppRoutingModule,
  ],
  providers: [
    DishService,
    ReviewService,
    CartService,
    AuthService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
