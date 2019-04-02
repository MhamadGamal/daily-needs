import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from '../../pages/category/category.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryDetailsComponent } from '../../pages/category-details/category-details.component';

const appRoutes: Routes = [
  { path: '', component: CategoryComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule

  ],
  declarations: [CategoryComponent, CategoryDetailsComponent],
  exports: [RouterModule],
})
export class CategoryModule { }
