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






const appRoutes: Routes = [
  {
    path: '', component: MyaccountComponent, children: [
      { path: '', component: AccountComponent },
      { path: 'my-orders', component: MyordersComponent },
      { path: 'favourits', component: FavouritsComponent }
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
