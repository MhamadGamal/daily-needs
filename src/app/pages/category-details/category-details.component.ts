import { CartService } from './../../shared/services/cart.service';
import { ApiInterceptorService } from 'src/app/shared/interceptor/api-interceptor.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';
import { IMenu, IresturentItemsInfo } from 'src/app/shared/models/menu';
import { MenuItemsService } from 'src/app/shared/services/menu-items.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  id: string;
  menu: IMenu;
  cartItems = 1;
  targetItem: IresturentItemsInfo;
  filterdCatArr: IresturentItemsInfo[];
  lang: string;
  isFavourite: boolean;
  subscription: Subscription = new Subscription();
  isItemLoaded: boolean;
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
    this.id = this.params.snapshot.paramMap.get('itemId');
  }

  ngOnInit() {
    if (this.menuItemsService.menu) {
      this.menu = this.menuItemsService.menu;
      this.filterdCatArr = this.menuItemsService.menu.restaurantsItemsListResponse.resturentItemsInfo;
      this.targetItem = this.filterdCatArr.filter((item: IresturentItemsInfo) => item.itemID === this.id)[0];
      console.log(this.targetItem);
      this.isItemLoaded = true;

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
        this.targetItem = this.filterdCatArr.filter((item: IresturentItemsInfo) => item.itemID === this.id)[0];
        this.isFavourite = this.targetItem.isFavorite === 'Y' ? true : false;
        this.isItemLoaded = true;
        console.log(this.targetItem);
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

  addToFavourite() {
    if (this.authService.isLoggedIn) {
      if (!this.isFavourite) {
        this.isFavourite = true;
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
              'CLIENT_FAVOURITE_ITEM_ID': this.targetItem.itemID,
              'CLIENT_NUMBER': this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.clientNumber,
              'ITEM_ARABIC_NAME': 'ITEM NAME',
              'ITEM_ENGLISH_NAME': 'ITEM NAME',
              'ITEM_ID': this.targetItem.itemID,
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
