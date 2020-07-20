import { environment } from 'src/environments/environment';
import { Component, OnInit , Input, OnChanges } from '@angular/core';
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
  @Input() setting: object;
  slides;

  subscription: Subscription = new Subscription();
  CarouselOptions;
  constructor() {
  }

  ngOnChanges() {
    this.CarouselOptions = this.setting;
    this.CarouselOptions.rtl = this.lang === 'en' ? false : true;
    this.slides = this.relatedProg;
  }
  ngOnInit() {
  }
  updateImage(ev) {
    ev.target.src = 'assets/images/default_image.png';
  }
}
