import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ApiInterceptorService } from 'src/app/shared/interceptor/api-interceptor.service';
import { IOrderInfo } from 'src/app/shared/models/order';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit {
  OrderFullInfo: Array<IOrderInfo>;
  scheduled: Array<IOrderInfo>;
  processing: Array<IOrderInfo>;
  previous: Array<IOrderInfo>;
  canceled: Array<IOrderInfo>;
  onWay: Array<IOrderInfo>;
  language: string;
  subscription: Subscription = new Subscription();
  constructor(
    private langS: LangService,
    private translate: TranslateService,
    public authService: AuthService,
    private api: ApiInterceptorService
  ) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.language = lang;
      }));
  }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    const reqBody = {
      'orderHistory': {
        'IClientNumber': this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.clientNumber,
        'additionalDataTab': {
          'lang': 'EN'
        },
        'channelInfo': {
          'AcquirerCountry': '818',
          'merchantName': 'android|9|5c60abbe-d36d-48ee-9e2a-f97af5d23b92|1.0.0'
        },
        'institutionNumber': '00000002',
        'processCode': '190300',
        'sourceID': '702000110001'
      },
      'serviceName': 'WSIOrderActivities'
    };
    this.api.call('POST', reqBody).subscribe((res: any) => {
      if (res.orderHistoryResponse) {
        this.OrderFullInfo = res.orderHistoryResponse.OrderFullInfo;
        console.log(this.OrderFullInfo);
        this.processing = this.OrderFullInfo.filter((order: IOrderInfo) => order.orderStatus.orderStatusName === 'Processing your info.');
        this.scheduled = this.OrderFullInfo.filter((order: IOrderInfo) => order.orderStatus.orderStatusName === 'Order Scheduled');
      } else if (res.error) {
        setTimeout(() => {
          this.getOrders();
        }, 500);
      }
    });
  }
}
