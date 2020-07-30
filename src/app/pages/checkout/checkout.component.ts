import { Router } from '@angular/router';
import { IresturentItemsInfo } from './../../shared/models/menu';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { IAddressInfo } from 'src/app/shared/models/address';
import { ApiInterceptorService } from 'src/app/shared/interceptor/api-interceptor.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NotifierService } from 'angular-notifier';
import { MenuItemsService } from 'src/app/shared/services/menu-items.service';

declare var $: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  addressList: Array<IAddressInfo>;
  checkoutForm: FormGroup;
  lang: string;
  subscription: Subscription = new Subscription();
  constructor(private translate: TranslateService, private langS: LangService,
    public cartService: CartService,
    private formBuilder: FormBuilder,
    private api: ApiInterceptorService,
    public authService: AuthService,
    private notifierService: NotifierService,
    private router: Router,
    private menuItemsService: MenuItemsService
  ) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.lang = lang;
      }));
  }

  ngOnInit() {
    this.getAddress();
    this.checkoutForm = this.formBuilder.group({
      address: [null, [Validators.required]],
      paymentMethod: ['cash', [Validators.required]],
      deliveryType: ['asap', [Validators.required]],
      date: [null],
      time: [null],
    });
  }
  expandDivNewAddress() {
    $('#newAddress').toggleClass('collapse', 'collapse in');
  }
  getAddress() {
    const reqBody = {
      'retrieveClientAddrress': {
        'clientNumber': this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.clientNumber,
        'institutionNumber': '00000002',
        'processCode': '146000',
        'sourceID': '702000110001'
      },
      'serviceName': 'WSIOrderClientinfo'
    };
    this.api.call('POST', reqBody).subscribe((res: any) => {
      if (res.retrieveClientAddressResponse) {
        if (Array.isArray(res.retrieveClientAddressResponse.clientAddressList)) {
          this.addressList = res.retrieveClientAddressResponse.clientAddressList;
        } else {
          this.addressList.push({
            FGeoLocationLat: res.retrieveClientAddressResponse.clientAddressList.FGeoLocationLat,
            FGeoLocationLong: res.retrieveClientAddressResponse.clientAddressList.FGeoLocationLong,
            addrClientCity: res.retrieveClientAddressResponse.clientAddressList.addrClientCity,
            addrLine1: res.retrieveClientAddressResponse.clientAddressList.addrLine1,
            addrLine2: res.retrieveClientAddressResponse.clientAddressList.addrLine2,
            addrLine3: res.retrieveClientAddressResponse.clientAddressList.addrLine3,
            addrLine4: res.retrieveClientAddressResponse.clientAddressList.addrLine4,
            addrLine5: res.retrieveClientAddressResponse.clientAddressList.addrLine5,
            addrLine6: res.retrieveClientAddressResponse.clientAddressList.addrLine6,
            addrLine7: res.retrieveClientAddressResponse.clientAddressList.addrLine7,
            addressCategory: res.retrieveClientAddressResponse.clientAddressList,
            addressID: res.retrieveClientAddressResponse.clientAddressList.addressCategory,
            areaId: res.retrieveClientAddressResponse.clientAddressList.areaId,
            clientCountry: res.retrieveClientAddressResponse.clientAddressList.clientCountry,
            isDefault: res.retrieveClientAddressResponse.clientAddressList.isDefault,
            postCode: res.retrieveClientAddressResponse.clientAddressList.postCode,
          });
        }
      } else {
        setTimeout(() => {
          this.getAddress();
        }, 500);
      }
    });
  }

  checkout(value) {
    if (this.authService.isLoggedIn) {
      let cartItems = [];
      this.cartService.cartItems.forEach((item: IresturentItemsInfo) => {
        cartItems.push(
          {
            'amount': {
              'grossOrderAmount': Number(item.cartItemsNum) * Number(item.prices.priceNumber),
              'netOrderAmount': Number(item.cartItemsNum) * Number(item.prices.priceNumber)
            },
            'discount': {
              'discountDesc': '',
              'discountID': '',
              'discountValue': '',
              'hasDiscount': '000'
            },
            'extraItems': [

            ],
            'items': {
              'itemID': item.itemID,
              'itemName': item.itemName,
              'note': '',
              'orderCategoryInfo': {
                'categoryID': item.categoryIDs,
                'categoryName': 'Unit'
              },
              'price': item.prices.priceNumber,
              'quantity': item.cartItemsNum
            },
            'voucher': {
              'voucherDescribtion': '',
              'voucherID': ''
            }
          }
        )
      })
      const now: any = new Date();
      const start: any = new Date(now.getFullYear(), 0, 0);
      const diff = now - start;
      const oneDay = 1000 * 60 * 60 * 24;
      const day = Math.floor(diff / oneDay);
      const invoice = '02' + this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.clientNumber +
        day + now.getHours() + now.getMinutes() + now.getSeconds() + '03'
      const reqbody = {
        'placeOrder': {
          'channelInfo': {
            'AcquirerCountry': '818',
            'merchantName': 'android|9|72e9b3c4-8dea-4e8c-95e1-29db6fdbdb70|1.0.0'
          },
          'institutionNumber': '00000002',
          'invoiceNumber': invoice,
          'onlineCardInfo': {

          },
          'optionalInfo': {

          },
          'orderInfo': [
            {
              'amount': {
                'grossOrderAmount': this.cartService.totalPrice + this.cartService.vat + this.cartService.shipping,
                'netOrderAmount': this.cartService.totalPrice
              },
              'customerOrderInfo': {
                'orderRequireClientInfo': {
                  'accountNumber': '03513143001',
                  'clientNumber': this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.clientNumber,
                  'groupNumber': '03513143'
                }
              },
              'deliveryAddress': {
                'address_index': value.address.addressID,
                'deliveryAddress': `Title: ${value.address.addrLine3},Street: ${value.address.addrLine2},District: ,Floor: floor ${value.address.addrLine3},Apartment: appartment ${value.address.addrLine7},Delivery Instructions:  ${value.address.addrLine5}`,
                'deliveryAddressDesc': 'eslam'
              },
              'dicount': {
                'discountDesc': '',
                'discountID': '',
                'discountValue': '',
                'hasDiscount': '000'
              },
              'invoiceNumber': invoice,
              'note': '',
              'orderDate': '',
              'orderFinancialDetailsTab': [
                {
                  'ATTRIBUTE_DESC': 'Additional Tax',
                  'ATTRIBUTE_FLAG': '',
                  'ATTRIBUTE_ID': '15',
                  'ATTRIBUTE_VALUE': '0.000'
                },
                {
                  'ATTRIBUTE_DESC': 'Additional Tax Percent',
                  'ATTRIBUTE_FLAG': '',
                  'ATTRIBUTE_ID': '15000',
                  'ATTRIBUTE_VALUE': '0.000'
                },
                {
                  'ATTRIBUTE_DESC': 'Delivery Fees',
                  'ATTRIBUTE_FLAG': '',
                  'ATTRIBUTE_ID': '43',
                  'ATTRIBUTE_VALUE': '0.000'
                },
                {
                  'ATTRIBUTE_DESC': 'Discount by value',
                  'ATTRIBUTE_FLAG': '',
                  'ATTRIBUTE_ID': '17',
                  'ATTRIBUTE_VALUE': '0.000'
                },
                {
                  'ATTRIBUTE_DESC': 'Discount by percentage',
                  'ATTRIBUTE_FLAG': '',
                  'ATTRIBUTE_ID': '18',
                  'ATTRIBUTE_VALUE': '0.000'
                },
                {
                  'ATTRIBUTE_DESC': 'Discount By Offer',
                  'ATTRIBUTE_FLAG': '',
                  'ATTRIBUTE_ID': '53',
                  'ATTRIBUTE_VALUE': '0.000'
                }
              ],
              'orderItemsDetails': cartItems,
              'paymentMethodID': '1',
              'paymentMethodName': value.paymentMethod,
              'restaurantOrderInfo': {
                'orderRequireClientInfo': {
                  'accountNumber': this.authService.loginedUserData.loginAuthenticationResponse.accountInfo.accountNumber,
                  'clientNumber': this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.clientNumber,
                  'groupNumber': '00005076'
                },
                'restaurantBranchID': this.menuItemsService.menu.restaurantsItemsListResponse.restaurantInfo.branchId,
                'restaurantBranchName': this.menuItemsService.menu.restaurantsItemsListResponse.restaurantInfo.restaurantName
              },
              'voucher': {
                'voucherDescribtion': '',
                'voucherID': ''
              }
            }
          ],
          'paymentInfo': {

          },
          'processCode': '147000',
          'sourceID': '702000110001',
          'tranAmount': '15.000',
          'tranCurrency': '818'
        },
        'serviceName': 'WSIOrderActivities'
      };
      this.api.call('POST', reqbody).subscribe((res: any) => {
        if (res.placeOrderResponse) {
          const Txt = this.lang === 'en' ? 'your order was placed successfully you will receive it formally after 24 hours , invoice number ' + res.placeOrderResponse.invoiceNumber : ' بنجاح وسوف تستلمه رسمياً بعد 24 ساعة ، رقم الفاتورة' + res.placeOrderResponse.invoiceNumber;
          this.notifierService.notify('success', Txt);
          setTimeout(() => {
            this.cartService.resetCart();
            this.router.navigate(['/home']);
          }, 5000);
        } else if (res.error) {
          setTimeout(() => {
            this.checkout(value);
          }, 500);
        }
      });
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
