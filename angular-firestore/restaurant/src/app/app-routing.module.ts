import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DishPageComponent } from './dishes/dish-page/dish-page.component';
import { DishesComponent } from './dishes/dishes.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoggedGuard } from './authentication/guards/logged.guard';
import { AdminGuard } from './authentication/guards/admin.guard';
import { ManagerGuard } from './authentication/guards/manager.guard';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { ManagerViewComponent } from './manager-view/manager-view.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "dishes", component: DishesComponent },
  { path: "dish/:dish.name", component: DishPageComponent, canActivate: [LoggedGuard] },
  { path: "cart", component: CartComponent, canActivate: [LoggedGuard] },
  { path: "managerview", component: ManagerViewComponent, canActivate: [LoggedGuard, ManagerGuard] },
  { path: "adminview", component: AdminViewComponent, canActivate: [LoggedGuard, AdminGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
