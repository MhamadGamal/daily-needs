import { SubprogramsComponent } from './../../pages/subprograms/subprograms.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProgramsComponent } from '../../pages/programs/programs.component';
import { ProgramDetailsComponent } from '../../pages/program-details/program-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RelatedProductsComponent } from 'src/app/components/related-products/related-products.component';


const appRoutes: Routes = [
  { path: '', component: ProgramsComponent },
  { path: 'sub/:id', component: SubprogramsComponent },
  { path: ':id', component: ProgramDetailsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule,
    CarouselModule
  ],
  declarations: [ProgramsComponent, ProgramDetailsComponent, RelatedProductsComponent, SubprogramsComponent],
  exports: [
    RouterModule,
  ],
})

export class ProgramsModule { }
