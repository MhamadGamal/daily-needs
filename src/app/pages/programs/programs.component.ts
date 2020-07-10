import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IMenu, IresturentItemsInfo, ICategoriesInfo, Iattributes } from 'src/app/shared/models/menu';
import { Subscription, Observable } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';
import { MenuItemsService } from 'src/app/shared/services/menu-items.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit, OnDestroy {
  programms: Array<IresturentItemsInfo | ICategoriesInfo>;
  id: string;
  menu: IMenu;
  filterdCatArr: IresturentItemsInfo[];
  relatedItems: IresturentItemsInfo[];
  lang: string;
  subscription: Subscription = new Subscription();
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
      this.getPrograms();
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
        this.getPrograms();
      } else {
        setTimeout(() => {
          this.getMenu();
        }, 500);
      }
    },
      err => {
        console.log(err)
      });
  }
  getPrograms() {
    this.programms = this.menu.restaurantsItemsListResponse.categoryType.categoriesInfo
      .filter((item: ICategoriesInfo) => {
        let isP;
        const p = item.attributes.filter((i: Iattributes) => {
          if (i.attributeID === '101' && i.attributeValue === '001') {
            isP = true;
          }
        });
        if (isP) {
          return item;
        }
      });
    this.menu.restaurantsItemsListResponse.resturentItemsInfo
      .filter((item: IresturentItemsInfo) => {
        let isP;
        const p = item.attributes.filter((i: Iattributes) => {
          if (i.attributeID === '121' && i.attributeValue === '001') {
            isP = true;
          }
        });
        if (isP) {
          this.programms.push(item);
        }
      });
    console.log(this.programms)
  }
  updateImage(ev) {
    ev.target.src = 'assets/images/default_image.png';
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
