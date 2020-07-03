import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, Observable } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MenuItemsService } from 'src/app/shared/services/menu-items.service';
import { IMenu, ICategoriesInfo, IresturentItemsInfo, Iattributes } from 'src/app/shared/models/menu';
import { IHealthInfo } from 'src/app/shared/services/firebase/policy.model';
import { HealthInfoService } from 'src/app/shared/services/firebase/healthInfo.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  language: string;
  subscription: Subscription = new Subscription();
  menu: IMenu;
  filteredItems: ICategoriesInfo[];
  search: string;
  searchResult: IresturentItemsInfo[];
  healthInfo: IHealthInfo[];
  filteredhealthInfo: IHealthInfo[];

  constructor(
    private langS: LangService,
    private translate: TranslateService,
    public authService: AuthService,
    private menuItemsService: MenuItemsService,
    private healthInfoService: HealthInfoService
  ) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.language = lang;
      }));
  }

  ngOnInit() {
    this.getMenu();
    this.getHealthInfo();
  }

  getMenu() {
    this.menuItemsService.getMenu().then((res: Observable<IMenu>) => {
      this.subscription.add(
        res
          .subscribe((menu: IMenu) => {
            this.menu = menu;
            this.menuItemsService.menu = menu;
          })
      );
    });
  }
  getDataSearch() {
    console.log(this.search);
    if (this.search !== '') {
      if (this.language === 'en') {
        this.searchResult = this.menu.restaurantsItemsListResponse.resturentItemsInfo.filter((_item: IresturentItemsInfo) => _item.attributes.filter((at: Iattributes) => at.attributeID === "1")[0].attributeValue.toLowerCase().includes(this.search.toLowerCase()));
        this.filteredhealthInfo = this.healthInfo.filter((item: IHealthInfo) => item.title.includes(this.search));
      } else {
        this.searchResult = this.menu.restaurantsItemsListResponse.resturentItemsInfo.filter((_item: IresturentItemsInfo) => _item.attributes.filter((at: Iattributes) => at.attributeID === "6")[0].attributeValue.toLowerCase().includes(this.search.toLowerCase()));
      }
    } else {
      this.searchResult = [];
    }

  }

  getHealthInfo() {
    this.healthInfoService.getHealthInfo().subscribe((data: IHealthInfo[]) => {
      this.healthInfo = data;
    });
  }
}
