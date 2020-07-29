import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { IresturentItemsInfo, IMenu, ICategoriesInfo, Iattributes } from 'src/app/shared/models/menu';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';
import { MenuItemsService } from 'src/app/shared/services/menu-items.service';
import { ActivatedRoute } from '@angular/router';
import { ApiInterceptorService } from 'src/app/shared/interceptor/api-interceptor.service';
import { NotifierService } from 'angular-notifier';
import { CartService } from 'src/app/shared/services/cart.service';


@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.css']
})
export class ProgramDetailsComponent implements OnInit, OnDestroy {
  programms: Array<IresturentItemsInfo | ICategoriesInfo>;
  targetProgramms: any;
  id: string;
  cartItems = 1;
  menu: IMenu;
  isFavourite: boolean;
  filterdCatArr: IresturentItemsInfo[];
  relatedItems: IresturentItemsInfo[] = [];
  lang: string;
  isItemLoaded: boolean;
  subscription: Subscription = new Subscription();
  environment = environment;
  constructor(private translate: TranslateService, private langS: LangService,
    private menuItemsService: MenuItemsService,
    private params: ActivatedRoute,
    private authService: AuthService,
    private api: ApiInterceptorService,
    private notifierService: NotifierService,
    public cartService: CartService
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

    this.targetProgramms = this.programms
      .find((p: any) => p.categoryID === this.id || p.itemID === this.id);
    this.relatedItems = this.getRelatedItems(this.targetProgramms.categoryID);
    console.log(this.targetProgramms);
    this.isItemLoaded = true;
  }
  getRelatedItems(id) {
    let related = [];
    if (id) {
      this.menu.restaurantsItemsListResponse.resturentItemsInfo
        .filter((_item: IresturentItemsInfo) => {
          if (typeof _item.categoryIDs === 'string') {
            if (_item.categoryIDs === id) { related.push(_item); }
          } else if (Array.isArray(typeof _item.categoryIDs)) {
            if (_item.categoryIDs.includes(id)) { related.push(_item); }
          }
        });
      return related;
    }
  }
  addToFavourite() {
    if (this.authService.isLoggedIn) {
      let id;
      if (this.targetProgramms.prices) {
        id = this.targetProgramms.itemID;
      } else {
        id = this.targetProgramms.categoryID;
      }
      this.isFavourite = true;
      if (this.isFavourite) {
        const reqBody = {
          'serviceName': 'WSIOrderClientinfo',
          'setClientFavoriteItems': {
            'additionalData': [
              {
                'lang': this.lang
              }
            ],
            'channelInfo': {
              'AcquirerCountry': '818',
              'merchantName': 'android|9|f8d1b93b-c788-48a2-8ee6-df829c07de5c|1.0.0'
            },
            'clientFavoriteItemTab': {
              'CLIENT_FAVOURITE_ITEM_ID': id,
              'CLIENT_NUMBER': this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.clientNumber,
              'ITEM_ARABIC_NAME': 'ITEM NAME',
              'ITEM_ENGLISH_NAME': 'ITEM NAME',
              'ITEM_ID': id,
              'RESTAURANT_BRANCHE_ID': '4968',
              'RESTAURANT_ID': '3648',
              'STATUS_CODE': '001',
              'terminalID': '111'
            },
            'clientNumber': this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.clientNumber,
            'institutionNumber': '00000002',
            'processCode': '170000',
            'sourceID': '702000110001'
          }
        };
        this.api.call('POST', reqBody).subscribe(res => console.log(res));
      }
    } else {
      const loginTxt = this.lang === 'en' ? 'kindlly login or signup to add items to wish list' : 'من فضلك قم بالتسجيل اولا لالضافه العناصر الي المفضله';
      this.notifierService.notify('success', loginTxt);

      document.querySelectorAll('[aria-labelledby="navbarDropdown"]')[1].classList.add('show');
    }
  }
  addToCart(num) {
    this.relatedItems.forEach((item: IresturentItemsInfo) => {
      debugger;
      this.cartService.addToCart(item.itemID, num);
    });
  }
  updateImage(ev) {
    ev.target.src = 'assets/images/default_image.png';
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
