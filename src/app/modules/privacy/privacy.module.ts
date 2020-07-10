import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PaymentPrivacyComponent } from 'src/app/pages/payment-privacy/payment-privacy.component';


const appRoutes: Routes = [
    { path: '', component: PaymentPrivacyComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(appRoutes),
        SharedModule
    ],
    declarations: [PaymentPrivacyComponent],
    exports: [RouterModule],
})
export class PrivacyModule { }
