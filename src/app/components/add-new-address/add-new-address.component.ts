import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';
import { TranslateService } from '@ngx-translate/core';
import { ApiInterceptorService } from 'src/app/shared/interceptor/api-interceptor.service';
import { AuthService } from 'src/app/shared/services/auth.service';

declare var $: any;

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.css']
})

export class AddNewAddressComponent implements OnInit {
  addAddress: boolean;
  newAddressForm: FormGroup;
  subscription: Subscription = new Subscription();
  language: string;
  constructor(
    private langS: LangService,
    private translate: TranslateService,
    private api: ApiInterceptorService,
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.language = lang;
      }));
  }

  ngOnInit() {
    this.newAddressForm = this.formBuilder.group({
      addressName: [null, [Validators.required]],
      city: [null, [Validators.required]],
      area: [null, [Validators.required]],
      mobile: [null],
      street: [null, [Validators.required]],
      appartment: [null],
      details: [null]
    });
  }

  addnewAddress() {
    this.addAddress = true;
  }
  saveAddress(value) {
    const reqBody = {
      'serviceName': 'WSIOrderClientinfo',
      'setClientAddress': {
        'additionalData': [
          {
            'lang': this.language
          }
        ],
        'addressDetails': {
          'FGeoLocationLat': '0.0',
          'FGeoLocationLong': '0.0',
          'addrClientCity': value.addressName,
          'addrLine1': value.city,
          'addrLine2': value.area,
          'addrLine3': value.street,
          'addrLine4': value.appartment,
          'addrLine5': value.details,
          'addrLine6': value.mobile,
          'addrLine7': 'appartment 14',
          'areaId': '115',
          'isDefault': '000'
        },
        'channelInfo': {
          'AcquirerCountry': '818',
          'merchantName': 'android|9|e8a8942d-ea91-433f-8fd2-4a5e577ad046|1.0.0'
        },
        'clientNumber': this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.clientNumber,
        'institutionNumber': '00000002',
        'processCode': '145000',
        'sourceID': '702000110001'
      }
    };
    this.api.call('POST', reqBody).then((obs: Observable<any>) => {
      obs.subscribe((res: any) => {
        console.log('newwwwww addd', res);
        this.addAddress = false;

      });
    });
  }
  cancel() {
    this.addAddress = false;
    this.newAddressForm.reset();
  }
}
