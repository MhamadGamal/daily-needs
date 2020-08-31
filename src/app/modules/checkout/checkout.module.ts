import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from '../../pages/category/category.component';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from '../../pages/cart/cart.component';
import { CheckoutComponent } from '../../pages/checkout/checkout.component';
import { CartDataComponent } from 'src/app/pages/cart-data/cart-data.component';


const appRoutes: Routes = [
  { path: '', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule,
  ],
  declarations: [CartComponent, CheckoutComponent, CartDataComponent],
  exports: [RouterModule],
})
export class CheckoutModule { }
