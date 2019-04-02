import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HealthComponent } from '../../pages/health/health.component';

const appRoutes: Routes = [
  { path: '', component: HealthComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [HealthComponent],
  exports: [RouterModule],
})
export class HealthModule { }
