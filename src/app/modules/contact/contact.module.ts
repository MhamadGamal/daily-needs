import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ContactusComponent } from 'src/app/pages/contactus/contactus.component';


const appRoutes: Routes = [
  { path: '', component: ContactusComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
    SharedModule
  ],
  declarations: [ContactusComponent],
  exports: [RouterModule],
})
export class ContactModule { }
