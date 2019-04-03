import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
/**********Installed package  ****************/
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { BootstrapModalModule } from 'ng6-bootstrap-modal';
// import { SwiperModule } from 'ngx-swiper-wrapper';
// import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
// import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
/**********Installed package  ****************/
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { ModalSignupComponent } from './components/modal-signup/modal-signup.component';
import { ModalSigninComponent } from './components/modal-signin/modal-signin.component';
import { DailyNeedProductsComponent } from './components/daily-need-products/daily-need-products.component';
import { OffersComponent } from './components/offers/offers.component';
import { KidsProductComponent } from './components/kids-product/kids-product.component';
import { DailyAppComponent } from './components/daily-app/daily-app.component';
import { HealthInformationComponent } from './components/health-information/health-information.component';
import { SharedModule } from './modules/shared/shared.module';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { PaymentPrivacyComponent } from './pages/payment-privacy/payment-privacy.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

// const config: SwiperConfigInterface = {
//   direction: 'horizontal',
//   slidesPerView: 'auto'
// };

const appRoutes = [
 {
    path: 'en',
    children: [
      { path: '', component: HomeComponent } ,
      { path: 'about', component: AboutusComponent } ,
      { path: 'contact-us', component: ContactusComponent } ,
      { path: 'privacy', component: PaymentPrivacyComponent } ,
      { path: "category",  loadChildren: "./modules/category/category.module#CategoryModule" },
      { path: "programs",  loadChildren: "./modules/programs/programs.module#ProgramsModule" },
      { path: "health",  loadChildren: "./modules/health/health.module#HealthModule" },
    ]
  },
  {
    path: 'ar',
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutusComponent } ,
      { path: 'contact-us', component: ContactusComponent } ,
      { path: 'privacy', component: PaymentPrivacyComponent } ,
      { path: "category",  loadChildren: "./modules/category/category.module#CategoryModule" },
      { path: "programs",  loadChildren: "./modules/programs/programs.module#ProgramsModule" },
      { path: "health",  loadChildren: "./modules/health/health.module#HealthModule" },
    ]
  },
  {
      path: '',
      redirectTo : 'ar',
      pathMatch : 'full'
  }

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModalSignupComponent,
    ModalSigninComponent,
    DailyNeedProductsComponent,
    OffersComponent,
    KidsProductComponent,
    DailyAppComponent,
    HealthInformationComponent,
    AboutusComponent,
    ContactusComponent,
    PaymentPrivacyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    BootstrapModalModule,
    ReactiveFormsModule,
    FormsModule,
    // SwiperModule,
    SharedModule
  ],
  providers: [
    // {
    //   provide: SWIPER_CONFIG,
    //   useValue: config
    // }
  ],
  bootstrap: [AppComponent],
  exports:[
    RouterModule,
    SharedModule
    
  ],
  entryComponents:[
    ModalSignupComponent ,
    ModalSigninComponent 
  ]
})
export class AppModule { }
