import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HealthComponent } from '../../pages/health/health.component';
import { PopularPostComponent } from '../../components/popular-post/popular-post.component';
import { HealthDetailsComponent } from '../../pages/health-details/health-details.component';




const appRoutes: Routes = [
  { path: '', component: HealthComponent, data: { title: 'Blog' } },
  { path: ':id', component: HealthDetailsComponent, data: { title: 'Blog Details' } }
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
