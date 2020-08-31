import { CartService } from 'src/app/shared/services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IMenu, IresturentItemsInfo, ICategoriesInfo, Iattributes } from 'src/app/shared/models/menu';
import { Subscription, Observable } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';
import { MenuItemsService } from 'src/app/shared/services/menu-items.service';
import { environment } from 'src/environments/environment';
import { ProgramDetailsComponent } from '../program-details/program-details.component';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit, OnDestroy {
  programms: Array<any>;
  id: string;
  menu: IMenu;
  isItemLoaded: boolean;
  filterdCatArr: IresturentItemsInfo[];
  relatedItems: IresturentItemsInfo[] = [];
  lang: string;
  subscription: Subscription = new Subscription();
  environment = environment;
  constructor(private translate: TranslateService, private langS: LangService,
    private menuItemsService: MenuItemsService,
    private cartService: CartService
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
      if (this.menuItemsService.relatedItems) {
        this.relatedItems = this.menuItemsService.relatedItems;
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
        this.getPrograms();
      } else {
        setTimeout(() => {
          this.getMenu();
        }, 500);
      }
    },
      err => {
        console.log(err);
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
    // this.menu.restaurantsItemsListResponse.resturentItemsInfo
    //   .filter((item: IresturentItemsInfo) => {
    //     let isP;
    //     if (this.programms) {
    //       this.programms.forEach((c: ICategoriesInfo, i) => {
    //         if (typeof item.categoryIDs === 'string') {
    //           if (item.categoryIDs !== c.categoryID) {
    //             const p = item.attributes.filter((i: Iattributes) => {
    //               if (i.attributeID === '121' && i.attributeValue === '001') {
    //                 isP = true;
    //               }
    //             });
    //           } else { this.programms[i].threeLevel = true; }
    //         } else if (Array.isArray(typeof item.categoryIDs)) {
    //           if (item.categoryIDs.includes(c.categoryID)) { this.programms[i].threeLevel = true; } else {
    //             const p = item.attributes.filter((i: Iattributes) => {
    //               if (i.attributeID === '121' && i.attributeValue === '001') {
    //                 isP = true;
    //               }
    //             });
    //           }
    //         }
    //       });
    //     }
    //     if (isP) {
    //       this.programms.push(item);
    //     }
    //   });

    // get realted items
    this.programms.forEach((item: any) => {
      if (item.categoryID) {
        this.menu.restaurantsItemsListResponse.resturentItemsInfo
          .filter((_item: IresturentItemsInfo) => {
            if (typeof _item.categoryIDs === 'string') {
              if (_item.categoryIDs === item.categoryID) { this.relatedItems.push(_item); }
            } else if (Array.isArray(typeof _item.categoryIDs)) {
              if (_item.categoryIDs.includes(item.categoryID)) { this.relatedItems.push(_item); }
            }
          });
      }
    });
    console.log(this.programms);
    console.log('related');
    this.menuItemsService.relatedItems = this.relatedItems;
    console.log(this.relatedItems);
    this.isItemLoaded = true;
  }
  updateImage(ev) {
    ev.target.src = 'assets/images/default_image.png';
  }
  addToCart(item: IresturentItemsInfo) {
    const related = [];
    if (item) {
      this.menu.restaurantsItemsListResponse.resturentItemsInfo
        .filter((_item: IresturentItemsInfo) => {
          if (typeof _item.categoryIDs === 'string') {
            if (_item.categoryIDs === item.itemID) { related.push(_item); }
          } else if (Array.isArray(typeof _item.categoryIDs)) {
            if (_item.categoryIDs.includes(item.itemID)) { related.push(_item); }
          }
        });
    }
    console.log(related);
    related.forEach((_item: IresturentItemsInfo, i) => {
      _item.prices.priceNumber = null;
      if (i === (this.relatedItems.length - 1)) {
        this.cartService.addToCart(_item, 1, item.prices.priceNumber);
      } else {
        this.cartService.addToCart(_item, 1);
      }
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
