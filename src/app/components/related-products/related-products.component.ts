import { environment } from 'src/environments/environment';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { IresturentItemsInfo } from 'src/app/shared/models/menu';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css']
})
export class RelatedProductsComponent implements OnInit, OnChanges {
  environment = environment;
  @Input() relatedProg: Array<IresturentItemsInfo>;
  @Input() lang: string;
  slides;
  isItemLoaded: boolean;
  subscription: Subscription = new Subscription();
  CarouselOptions = {
    items: 4,
    dots: false,
    nav: true,
    margin: 20,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'],
    // rtl: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      },
      1200: {
        items: 4
      }
    }
  };
  constructor() {
  }

  ngOnChanges() {
    if (this.CarouselOptions) {
      // this.CarouselOptions.rtl = this.lang === 'en' ? false : true;
    }
    this.slides = this.relatedProg;
  }
  ngOnInit() {
    this.isItemLoaded = true;
  }
  updateImage(ev) {
    ev.target.src = 'assets/images/default_image.png';
  }
}
