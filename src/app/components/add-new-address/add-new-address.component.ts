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
      details: ['']
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
          'addrClientCity': value.city,
          'addrLine1': value.area,
          'addrLine2': value.street,
          'addrLine3': value.addressName,
          'addrLine4': '143',
          'addrLine5': value.details,
          'addrLine6': '',
          'addrLine7': value.appartment,
          'areaId': '115',
          'isDefault': '001'
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
    this.api.call('POST', reqBody).subscribe((res: any) => {
      if (res.updateClientInfoResponse) {
        this.addAddress = false;
      } else if (res.error) {
        setTimeout(() => {
          this.saveAddress(value);
        }, 500);
      }

    });
  }
  cancel() {
    this.addAddress = false;
    this.newAddressForm.reset();
  }
}
