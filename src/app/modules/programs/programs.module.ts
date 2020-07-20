import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProgramsComponent } from '../../pages/programs/programs.component';
import { ProgramDetailsComponent } from '../../pages/program-details/program-details.component';


const appRoutes: Routes = [
  { path: '', component: ProgramsComponent },
  { path: ':id', component: ProgramDetailsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule
  ],
  declarations: [ProgramsComponent, ProgramDetailsComponent],
  exports: [
    RouterModule,
  ],
})

export class ProgramsModule { }
