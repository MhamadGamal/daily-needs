import { ICategoriesInfo, Iattributes, IresturentItemsInfo } from './../../shared/models/menu';
import { MenuItemsService } from './../../shared/services/menu-items.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/shared/services/lang.service';
import { IMenu } from 'src/app/shared/models/menu';
import { HealthInfoService } from 'src/app/shared/services/firebase/healthInfo.service';
import { IHealthInfo } from 'src/app/shared/services/firebase/policy.model';

@Component({
  selector: 'app-daily-need-products',
  templateUrl: './daily-need-products.component.html',
  styleUrls: ['./daily-need-products.component.css']
})
export class DailyNeedProductsComponent implements OnInit, OnDestroy {
  menu: IMenu;
  lang: string;
  subscription: Subscription = new Subscription();
  filterdCat = 'all';
  filterdCatArr: IresturentItemsInfo[];
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
    this.getMenu();
  }
  getMenu() {
    this.menuItemsService.getMenu().then((res: Observable<IMenu>) => {
      this.subscription.add(
        res
          .subscribe((menu: IMenu) => {
            console.log(menu);
            this.menu = menu;
            this.menuItemsService.menu = menu;
            this.filterdCatArr = menu.restaurantsItemsListResponse.resturentItemsInfo;
          })
      );
    });
  }

  filterr(item: ICategoriesInfo) {
    if (item.categoryID) {
      // tslint:disable-next-line: max-line-length
      this.filterdCat = this.lang === 'en' ? item.attributes.filter((att: Iattributes) => att.attributeID === '4')[0].attributeValue : item.attributes.filter((att: Iattributes) => att.attributeID === '9')[0].attributeValue;
      // tslint:disable-next-line: max-line-length
      this.filterdCatArr = this.menu.restaurantsItemsListResponse.resturentItemsInfo.filter((_item: IresturentItemsInfo) => _item.categoryIDs === item.categoryID);
    }
    if (this.filterdCat === 'all') {
      this.filterdCatArr = this.menu.restaurantsItemsListResponse.resturentItemsInfo;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
