import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from '../../pages/category/category.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryDetailsComponent } from '../../pages/category-details/category-details.component';
import { CartComponent } from '../../pages/cart/cart.component';
import { CheckoutComponent } from '../../pages/checkout/checkout.component';
import { CategoryItemListComponent } from '../../pages/category-item-list/category-item-list.component';

import { arPageTitle } from '../../../assets/i18n/arPageTitle';
import { enPageTitle } from '../../../assets/i18n/enPageTitle';

const arr = window.location.pathname.split('/');
export function getLang(key){
  let keyTranslate = '';
  if(arr[1] === 'ar'){
   keyTranslate = arPageTitle[key];
}
  else if(arr[1] === 'en'){
    keyTranslate = enPageTitle[key];
  }
  return keyTranslate;
}
const appRoutes: Routes = [
  { path: '', component: CategoryComponent , data: { title: 'Category' , breadcrumbs:  getLang('category')} },
  { path: 'items/:categoryId', component: CategoryItemListComponent ,data: { title: 'Category list' , breadcrumbs:  getLang('category-list')}},
  { path: 'item-details/:itemId', component: CategoryDetailsComponent ,data: { title: 'Category details' , breadcrumbs:  getLang('category-details')}},
  { path: 'cart', component: CartComponent ,data: { title: 'Cart' , breadcrumbs:  getLang('cart')}},
  { path: 'cart/checkout', component: CheckoutComponent ,data: { title: 'checkout' , breadcrumbs:  getLang('checkout')}},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule,
  ],
  declarations: [CategoryComponent, CategoryDetailsComponent, CartComponent, CheckoutComponent, CategoryItemListComponent],
  exports: [RouterModule],
})
export class CategoryModule { }
