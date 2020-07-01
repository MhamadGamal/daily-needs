import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { PaymentPrivacyComponent } from './pages/payment-privacy/payment-privacy.component';
import { SearchComponent } from './pages/search/search.component';
import { SharedModule } from './modules/shared/shared.module';
import { ModalSignupComponent } from './components/modal-signup/modal-signup.component';
import { ModalSigninComponent } from './components/modal-signin/modal-signin.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NumberOnlyDirective } from './shared/directives/number-only.directive';
import { FilterPipe } from './shared/pipes/filter.pipe';

const appRoutes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module')
          .then(m => m.HomeModule)
      },
      {
        path: 'about',
        component: AboutusComponent
      },
      {
        path: 'contact-us',
        component: ContactusComponent
      },
      {
        path: 'privacy',
        component: PaymentPrivacyComponent
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'category',
        loadChildren: () => import('./modules/category/category.module')
          .then(m => m.CategoryModule)
      },
      {
        path: 'programs',
        loadChildren: () => import('./modules/programs/programs.module')
          .then(m => m.ProgramsModule)
      },
      {
        path: 'health',
        loadChildren: () => import('./modules/health/health.module')
          .then(m => m.HealthModule)
      },
      {
        path: 'myaccount',
        loadChildren: () => import('./modules/myaccount/myaccount.module')
          .then(m => m.MyaccountModule)
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ModalSignupComponent,
    ModalSigninComponent,
    HeaderComponent,
    FooterComponent,
    NumberOnlyDirective
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgbModule,
    SharedModule,
    BrowserAnimationsModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  exports: [
    RouterModule,
  ],
  entryComponents: [
    ModalSignupComponent,
    ModalSigninComponent
  ]
})
export class AppModule { }
