import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HealthComponent } from '../../pages/health/health.component';
import { PopularPostComponent } from '../../components/popular-post/popular-post.component';
import { HealthDetailsComponent } from '../../pages/health-details/health-details.component';

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
  { path: '', component: HealthComponent ,data: { title: 'Health information'}},
  { path: ':id', component: HealthDetailsComponent ,data: { title: 'Health details' , breadcrumbs:  getLang('health-details')}},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule
  ],
  declarations: [HealthComponent, PopularPostComponent, HealthDetailsComponent],
  exports: [RouterModule],
})
export class HealthModule { }
