import { DailyNeedProductsComponent } from 'src/app/components/daily-need-products/daily-need-products.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { RouterModule } from '@angular/router';
import { AddNewAddressComponent } from '../../components/add-new-address/add-new-address.component';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const config: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    McBreadcrumbsModule.forRoot(),
    HttpClientModule,
    SwiperModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatCarouselModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  declarations: [
    AddNewAddressComponent,
    FilterPipe,
    DailyNeedProductsComponent
  ],
  exports: [
    DailyNeedProductsComponent,
    AddNewAddressComponent,
    TranslateModule,
    SwiperModule,
    McBreadcrumbsModule,
    ReactiveFormsModule,
    FormsModule,
    MatCarouselModule,
    FilterPipe,
    AngularFireModule,
    AngularFireDatabaseModule

  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: config
    }
  ],
})
export class SharedModule { }
