import { LangService } from './../../shared/services/lang.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public isLogged = false;

  slides = [
    'assets/images/slider.png',
    'assets/images/slider2.png',
    'assets/images/program.jpg',
  ];


  lang: string;
  subscription: Subscription = new Subscription();
  constructor(private translate: TranslateService, private langS: LangService) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.lang = lang;
        this.translate.use(lang);
      }));
    const token = localStorage.getItem('token');
    if (token) {
      this.isLogged = true;
    }

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
