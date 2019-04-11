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
import { SearchComponent } from './pages/search/search.component';
// import { arPageTitle } from '../assets/i18n/arPageTitle';
// import { enPageTitle } from '../assets/i18n/enPageTitle';

// const arr = window.location.pathname.split('/');
// export function getLang(key){
//   let keyTranslate = '';
//   if(arr[1] === 'ar'){
//    keyTranslate = arPageTitle[key];
//    console.log('test');
// }
//   else if(arr[1] === 'en'){
//     keyTranslate = enPageTitle[key];
//   }
//   return keyTranslate;
// }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


const appRoutes = [
 {
    path: 'en',
    children: [
      { path: '', component: HomeComponent ,data: { title: 'Home' , breadcrumbs:  'Home'}} ,
      { path: 'about', component: AboutusComponent ,data: { title: 'about' , breadcrumbs:  'About'}} ,
      { path: 'contact-us', component: ContactusComponent ,data: { title: 'Contact us' , breadcrumbs:  'Contact us'}} ,
      { path: 'privacy', component: PaymentPrivacyComponent ,data: { title: 'Payment privacy' , breadcrumbs: 'Payment privacy'}} ,
      { path: 'search', component: SearchComponent } ,
      { path: "category",  loadChildren: "./modules/category/category.module#CategoryModule" ,data: { breadcrumbs: 'Category' }},
      { path: "programs",  loadChildren: "./modules/programs/programs.module#ProgramsModule" ,data: { breadcrumbs: 'Programs' }},
      { path: "health",  loadChildren: "./modules/health/health.module#HealthModule" ,data: { breadcrumbs: 'Health' }},
      { path: "myaccount",  loadChildren: "./modules/myaccount/myaccount.module#MyaccountModule" ,data: { breadcrumbs: 'My account' }},
    ]
  },
  {
    path: 'ar',
    children: [
      { path: '', component: HomeComponent ,data: { title: 'Home' , breadcrumbs:  'الصفحة الرئيسية'}} ,
      { path: 'about', component: AboutusComponent ,data: { title: 'about' , breadcrumbs:  'عن دايلي نيدز'}} ,
      { path: 'contact-us', component: ContactusComponent ,data: { title: 'Contact us' , breadcrumbs: 'اتصل بنا'}} ,
      { path: 'privacy', component: PaymentPrivacyComponent ,data: { title: 'Payment privacy' , breadcrumbs: 'سياسة الدفع'}} ,
      { path: 'search', component: SearchComponent } ,
      { path: "category",  loadChildren: "./modules/category/category.module#CategoryModule" ,data: { breadcrumbs: 'التصنيفات' }},
      { path: "programs",  loadChildren: "./modules/programs/programs.module#ProgramsModule" ,data: { breadcrumbs: 'البرامج' }},
      { path: "health",  loadChildren: "./modules/health/health.module#HealthModule" ,data: { breadcrumbs: 'عن الصحة' }},
      { path: "myaccount",  loadChildren: "./modules/myaccount/myaccount.module#MyaccountModule" ,data: { breadcrumbs: 'حسابي' }},
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
    PaymentPrivacyComponent,
    SearchComponent
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
    SharedModule,
  ],
  entryComponents:[
    ModalSignupComponent ,
    ModalSigninComponent 
  ]
})
export class AppModule { }
