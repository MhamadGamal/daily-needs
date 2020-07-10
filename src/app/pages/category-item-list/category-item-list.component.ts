import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, Observable } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';
import { IMenu, IresturentItemsInfo, ICategoriesInfo } from 'src/app/shared/models/menu';
import { MenuItemsService } from 'src/app/shared/services/menu-items.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-category-item-list',
  templateUrl: './category-item-list.component.html',
  styleUrls: ['./category-item-list.component.css']
})
export class CategoryItemListComponent implements OnInit, OnDestroy {
  data: ICategoriesInfo;
  id: string;
  menu: IMenu;
  filterdCatArr: IresturentItemsInfo[];
  lang: string;
  subscription: Subscription = new Subscription();
  constructor(private translate: TranslateService, private langS: LangService,
    private menuItemsService: MenuItemsService,
    private params: ActivatedRoute
  ) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.lang = lang;
      }));
    this.id = this.params.snapshot.paramMap.get('categoryId');

  }

  ngOnInit() {
    if (this.menuItemsService.menu) {
      this.menu = this.menuItemsService.menu;
      this.filterdCatArr = this.menuItemsService.menu.restaurantsItemsListResponse.resturentItemsInfo;
      this.data = this.menu.restaurantsItemsListResponse.categoryType.categoriesInfo
        .filter((item: ICategoriesInfo) => item.categoryID === this.id)[0];
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
        this.data = this.menu.restaurantsItemsListResponse.categoryType.categoriesInfo
          .filter((item: ICategoriesInfo) => item.categoryID === this.id)[0];
      } else {
        setTimeout(() => {
          this.getMenu();
        }, 500);
      }
    });
  }
  updateImage(ev) {
    ev.target.src = 'assets/images/default_image.png';
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
