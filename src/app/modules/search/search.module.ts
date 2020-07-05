import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from 'src/app/pages/search/search.component';






const appRoutes: Routes = [
    {
        path: '', component: SearchComponent
    },

];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        SharedModule
    ],
    declarations: [
        SearchComponent
    ],
    exports: [RouterModule],
})
export class SearchModule { }
