import { LangService } from './../../shared/services/lang.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { IMenu, IresturentItemsInfo, Iattributes } from 'src/app/shared/models/menu';
import { MenuItemsService } from 'src/app/shared/services/menu-items.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  filterdCatArr: IresturentItemsInfo[];
  menu: IMenu;
  slides: string[] = [];
  environment = environment;
  lang: string;
  subscription: Subscription = new Subscription();
  constructor(private translate: TranslateService, private langS: LangService, private menuItemsService: MenuItemsService) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.lang = lang;
        this.translate.use(lang);
      }));

  }

  ngOnInit() {
    if (this.menuItemsService.menu) {
      this.menu = this.menuItemsService.menu;
      this.filterdCatArr = this.menuItemsService.menu.restaurantsItemsListResponse.resturentItemsInfo;
      this.filterdCatArr.filter((item: IresturentItemsInfo) => {
        const target = item.attributes.filter((att: Iattributes) => att.attributeID === '120')[0];
        if (target) {
          this.slides.push(environment.imgUrl + '/Items/Small/' + item.itemID + '.png');
        }
      });
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
        this.filterdCatArr.filter((item: IresturentItemsInfo) => {
          const target = item.attributes.filter((att: Iattributes) => att.attributeID === '120')[0];
          if (target) {
            this.slides.push(environment.imgUrl + '/Items/Small/' + item.itemID + '.png');
          }
        });
      } else {
        setTimeout(() => {
          this.getMenu();
        }, 500);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
