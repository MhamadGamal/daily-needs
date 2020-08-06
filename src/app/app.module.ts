import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SharedModule } from './modules/shared/shared.module';
import { ModalSignupComponent } from './components/modal-signup/modal-signup.component';
import { ModalSigninComponent } from './components/modal-signin/modal-signin.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NumberOnlyDirective } from './shared/directives/number-only.directive';
import { AuthGuard } from './shared/guard/auth.guard';
import { SubprogramsComponent } from './pages/subprograms/subprograms.component';

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
        loadChildren: () => import('./modules/about/about.module')
          .then(m => m.AboutModule)
      },
      {
        path: 'contact-us',
        loadChildren: () => import('./modules/contact/contact.module')
          .then(m => m.ContactModule)
      },
      {
        path: 'privacy',
        loadChildren: () => import('./modules/privacy/privacy.module')
          .then(m => m.PrivacyModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./modules/search/search.module')
          .then(m => m.SearchModule)
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
          .then(m => m.MyaccountModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'cart',
        loadChildren: () => import('./modules/checkout/checkout.module')
          .then(m => m.CheckoutModule)
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
