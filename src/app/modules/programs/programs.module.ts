import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProgramsComponent } from '../../pages/programs/programs.component';
import { RelatedProductsComponent } from '../../components/related-products/related-products.component';
import { ProgramDetailsComponent } from '../../pages/program-details/program-details.component';
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
  { path: '', component: ProgramsComponent ,data: { title: 'Programs' , breadcrumbs:  getLang('programs')}},
  { path: ':id', component: ProgramDetailsComponent ,data: { title: 'Program details' , breadcrumbs:  getLang('program-details')}},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule
  ],
  declarations: [ProgramsComponent, RelatedProductsComponent, ProgramDetailsComponent],
  exports: [
    RouterModule,
  ],
})

export class ProgramsModule { }
