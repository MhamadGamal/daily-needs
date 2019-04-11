import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MyaccountComponent } from '../../pages/myaccount/myaccount.component';
import { MyordersComponent } from '../../pages/myorders/myorders.component';
import { FavouritsComponent } from '../../pages/favourits/favourits.component';
import { AccountComponent } from '../../components/account/account.component';
import { FavouritItemsComponent } from '../../components/favourit-items/favourit-items.component';
import { FavouritHealthinfoComponent } from '../../components/favourit-healthinfo/favourit-healthinfo.component';
import { MyordersContentComponent } from '../../components/myorders-content/myorders-content.component';

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
  {
    path: '', component: MyaccountComponent, data: { title: 'My account' }, children: [
      { path: '', component: AccountComponent, data: { title: 'My account' }, outlet: 'primary' },
      { path: 'my-orders', component: MyordersComponent, data: { title: 'My Orders' , breadcrumbs:  getLang('my-orders')}, outlet: 'primary' },
      { path: 'favourits', component: FavouritsComponent, data: { title: 'Favourits' , breadcrumbs:  getLang('favouirts')}, outlet: 'primary' },
    ]
  },

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule
  ],
  declarations: [
    MyaccountComponent,
    MyordersComponent,
    FavouritsComponent,
    AccountComponent,
    FavouritItemsComponent,
    FavouritHealthinfoComponent,
    MyordersContentComponent
  ],
  exports: [RouterModule],
})
export class MyaccountModule { }
