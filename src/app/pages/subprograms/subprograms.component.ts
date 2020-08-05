import { Component, OnInit } from '@angular/core';
import { IresturentItemsInfo, IMenu } from 'src/app/shared/models/menu';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/shared/services/lang.service';
import { MenuItemsService } from 'src/app/shared/services/menu-items.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { ApiInterceptorService } from 'src/app/shared/interceptor/api-interceptor.service';

@Component({
  selector: 'app-subprograms',
  templateUrl: './subprograms.component.html',
  styleUrls: ['./subprograms.component.css']
})
export class SubprogramsComponent implements OnInit {

  targetProgramms: any;
  id: string;
  cartItems = 1;
  menu: IMenu;
  isFavourite: boolean;
  filterdCatArr: IresturentItemsInfo[];
  relatedItems: IresturentItemsInfo[] = [];
  s_relatedItems: IresturentItemsInfo[] = [];
  lang: string;
  isItemLoaded: boolean;
  subscription: Subscription = new Subscription();
  environment = environment;
  constructor(private translate: TranslateService, private langS: LangService,
    private menuItemsService: MenuItemsService,
    private params: ActivatedRoute,
    public cartService: CartService,
    private api: ApiInterceptorService,
  ) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.lang = lang;
      }));
    this.id = this.params.snapshot.paramMap.get('id');

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
        console.log(err);
      });
  }
  getPrograms() {
    // target prog dtails
    this.targetProgramms = this.menu.restaurantsItemsListResponse.categoryType.categoriesInfo
      .find((p: any) => p.categoryID === this.id);
    // related progs
    this.relatedItems = this.getRelatedItems(this.id);
    this.isItemLoaded = true;
  }
  getRelatedItems(id) {
    const related = [];
    if (id) {
      this.menu.restaurantsItemsListResponse.resturentItemsInfo
        .filter((_item: IresturentItemsInfo, i) => {
          if (typeof _item.categoryIDs === 'string') {
            if (_item.categoryIDs === id) {
              related.push(_item);
              this.menu.restaurantsItemsListResponse.resturentItemsInfo[i].threeLevel = true;
            }
          } else if (Array.isArray(typeof _item.categoryIDs)) {
            if (_item.categoryIDs.includes(id)) {
              related.push(_item);
              this.menu.restaurantsItemsListResponse.resturentItemsInfo[i].threeLevel = true;
            }
          }
        });
      return related;
    }
  }
  getComponents(id, num) {
    const reqBody = {
      'restaurantsItemsList': {
        'additionalData': [
          {
            'lang': 'EN'
          }
        ],
        'areaID': '',
        'branchId': id,
        'channelInfo': {
          'AcquirerCountry': '818',
          'merchantName': 'android|10|31567f21-7ec3-43ca-ad3b-27528c4821ee|1.0.0'
        },
        'clientNumber': '03513168',
        'institutionNumber': '00000002',
        'processCode': '144100',
        'resturantID': id,
        'sourceID': '702000110001'
      },
      'serviceName': 'WSIOrderActivities'
    };
    this.api.call('POST', reqBody).subscribe((res: any) => {
      if (res.restaurantsItemsListResponse.resturentItemsInfo.extraGroup.extraItems) {
        const formattedItems = [];
        res.restaurantsItemsListResponse.resturentItemsInfo.extraGroup.extraItems.forEach((item: any) => {
          formattedItems.push(item.itemID);
        });
        formattedItems.forEach((id) => {
          const target = this.menu.restaurantsItemsListResponse.resturentItemsInfo.find((item: IresturentItemsInfo) => item.itemID === id);
          if (target) {
            this.s_relatedItems.push(target);
          } else {
            res.restaurantsItemsListResponse.resturentItemsInfo.extraGroup.extraItems.forEach((item: any) => {
              if (item.itemID === id) {
                this.s_relatedItems.push({
                  itemID: item.itemID,
                  itemName: item.itemName,
                  prices: {
                    categoryID: item.extraItemInfo.extraItemCatID,
                    maxExtraItemQuantity: item.extraItemInfo.maxItemQuantity,
                    minExtraItemQuantity: item.extraItemInfo.minItemQuantity,
                    priceItemCategoryID: item.extraItemInfo.priceItemCategoryIDs
                  }
                });
              }
            });
          }
        });
        this.s_relatedItems.forEach((item: IresturentItemsInfo, i) => {
          item.prices.priceNumber = null;
          if (i === (this.s_relatedItems.length - 1)) {
            this.cartService.addToCart(item, num, this.relatedItems[i].prices.priceNumber);
          } else {
            this.cartService.addToCart(item, num);
          }
        });
        localStorage.setItem('s_relatedItems', JSON.stringify(this.s_relatedItems));
      }
    });
  }
  addToCart(item: IresturentItemsInfo, num) {
    this.getComponents(item.itemID, num);
  }
  updateImage(ev) {
    ev.target.src = 'assets/images/default_image.png';
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
