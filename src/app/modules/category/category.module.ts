import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from '../../pages/category/category.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryDetailsComponent } from '../../pages/category-details/category-details.component';
import { CartComponent } from '../../pages/cart/cart.component';

const appRoutes: Routes = [
  { path: '', component: CategoryComponent },
  { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule

  ],
  declarations: [CategoryComponent, CategoryDetailsComponent, CartComponent],
  exports: [RouterModule],
})
export class CategoryModule { }
