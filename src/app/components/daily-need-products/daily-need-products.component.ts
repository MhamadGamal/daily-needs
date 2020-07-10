import { ICategoriesInfo, Iattributes, IresturentItemsInfo } from './../../shared/models/menu';
import { MenuItemsService } from './../../shared/services/menu-items.service';
import { Component, OnInit, Input, OnDestroy, OnChanges, DoCheck } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/shared/services/lang.service';
import { IMenu } from 'src/app/shared/models/menu';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-daily-need-products',
  templateUrl: './daily-need-products.component.html',
  styleUrls: ['./daily-need-products.component.css']
})
export class DailyNeedProductsComponent implements OnInit, OnDestroy {
  lang: string;
  subscription: Subscription = new Subscription();
  filterdCat = 'all';
  menu: IMenu;
  filterdCatArr: IresturentItemsInfo[];
  max = 8;
  showLoadMore = true;
  @Input() type: string;
  @Input() filterCList: ICategoriesInfo;
  environment = environment;
  constructor(private translate: TranslateService, private langS: LangService,
    private menuItemsService: MenuItemsService
  ) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.lang = lang;
      }));
  }

  ngOnInit() {
    if (this.menuItemsService.menu) {
      this.menu = this.menuItemsService.menu;
      this.filterdCatArr = this.menuItemsService.menu.restaurantsItemsListResponse.resturentItemsInfo;
      if (this.filterCList) {
        this.filterr(this.filterCList);
      }
    }
    if (!this.menu) {
      this.getMenu();
    }

  }

  getMenu() {
    this.menuItemsService.getMenu().subscribe((menu: IMenu) => {
      if (menu.restaurantsItemsListResponse) {
        this.menu = menu;
        this.menuItemsService.menu = menu;
        this.filterdCatArr = menu.restaurantsItemsListResponse.resturentItemsInfo;
        if (this.filterCList) {
          this.filterr(this.filterCList);
        }
      } else {
        setTimeout(() => {
          this.getMenu();
        }, 500);
      }
    });
  }

  filterr(item: ICategoriesInfo) {
    this.max = 8;
    if (item.categoryID) {

      this.filterdCat = this.lang === 'en' ? item.attributes.filter((att: Iattributes) => att.attributeID === '4')[0].attributeValue :
        item.attributes.filter((att: Iattributes) => att.attributeID === '9')[0].attributeValue;

      this.filterdCatArr = this.menu.restaurantsItemsListResponse.resturentItemsInfo
        .filter((_item: IresturentItemsInfo) => {
          if (typeof _item.categoryIDs === 'string') {
            if (_item.categoryIDs === item.categoryID) { return _item; }
          } else if (Array.isArray(typeof _item.categoryIDs)) {
            if (_item.categoryIDs.includes(item.categoryID)) { return _item; }
          }
        });
    }

    if (this.filterdCat === 'all') {
      this.filterdCatArr = this.menu.restaurantsItemsListResponse.resturentItemsInfo;
    }
    this.showLoadMore = this.max === this.filterdCatArr.length ? false : true;

  }
  loadMore() {
    if (this.filterdCatArr.length > (this.max + 4)) {
      this.max += 4;
    } else {
      this.max += this.filterdCatArr.length - this.max;
    }
    this.showLoadMore = this.max === this.filterdCatArr.length ? false : true;

  }
  updateImage(ev) {
    ev.target.src = 'assets/images/default_image.png';
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
