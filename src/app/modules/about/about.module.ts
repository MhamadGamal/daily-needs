import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AboutusComponent } from 'src/app/pages/aboutus/aboutus.component';




const appRoutes: Routes = [
    { path: '', component: AboutusComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        SharedModule
    ],
    declarations: [AboutusComponent],
    exports: [RouterModule],
})
export class AboutModule { }
