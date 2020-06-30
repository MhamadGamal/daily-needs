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
  ],
  declarations: [
    AddNewAddressComponent,
  ],
  exports: [
    AddNewAddressComponent,
    TranslateModule,
    SwiperModule,
    McBreadcrumbsModule,
    ReactiveFormsModule,
    FormsModule,
    MatCarouselModule

  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: config
    }
  ],
})
export class SharedModule { }
