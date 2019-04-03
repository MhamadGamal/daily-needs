import { Component, OnInit ,Input } from '@angular/core';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css']
})
export class RelatedProductsComponent implements OnInit {

  @Input() lang;
  public slides = [
    'assets/dynamicImg/need1.png',
    'assets/dynamicImg/need2.png',
    'assets/dynamicImg/need3.png',
    'assets/dynamicImg/need4.png',
    'assets/dynamicImg/need2.png',
    'assets/dynamicImg/need3.png',
  ];

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 3,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
    pagination: false
  };

  constructor() { }

  ngOnInit() {
  }

}
