import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { DailyNeedProductsComponent } from 'src/app/components/daily-need-products/daily-need-products.component';
import { OffersComponent } from 'src/app/components/offers/offers.component';
import { KidsProductComponent } from 'src/app/components/kids-product/kids-product.component';
import { DailyAppComponent } from 'src/app/components/daily-app/daily-app.component';
import { HealthInformationComponent } from 'src/app/components/health-information/health-information.component';


@NgModule({
  declarations: [
    HomeComponent,
    DailyNeedProductsComponent,
    OffersComponent,
    KidsProductComponent,
    DailyAppComponent,
    HealthInformationComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
