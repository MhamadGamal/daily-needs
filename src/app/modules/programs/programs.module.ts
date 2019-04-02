import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProgramsComponent } from '../../pages/programs/programs.component';

const appRoutes: Routes = [
  { path: '', component: ProgramsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [ProgramsComponent],
  exports: [RouterModule],
})

export class ProgramsModule { }
