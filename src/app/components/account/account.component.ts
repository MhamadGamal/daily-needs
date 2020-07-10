import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';
import { ApiInterceptorService } from 'src/app/shared/interceptor/api-interceptor.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UpdateClientInfoResponse, IUpdateClientInfoResponse } from 'src/app/shared/models/logined-user-data';
import { ModalSigninComponent } from '../modal-signin/modal-signin.component';

declare var $: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {


  isEdit: boolean;
  form: FormGroup;
  addressForm: FormGroup;
  hasAddress: boolean;
  language: string;
  subscription: Subscription = new Subscription();
  constructor(
    private langS: LangService,
    private translate: TranslateService,
    private api: ApiInterceptorService,
    public authService: AuthService
  ) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.language = lang;
      }));
  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl({
        value: this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.firstName
        , disabled: true
      }, [Validators.required]),
      lastName: new FormControl({
        value: this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.lastName
        , disabled: true
      }, [Validators.required]),
      email: new FormControl({
        value: this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.email
        , disabled: true
      }, [Validators.required]),
      phone: new FormControl({
        value: this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.mobileNumber
        , disabled: true
      }, [Validators.required]),
    });
    this.addressForm = new FormGroup({
      address: new FormControl({ value: [''], disabled: true }, [Validators.required]),
    });
    this.getAddress();
  }

  editForm() {
    this.form.get('firstName').enable();
    this.form.get('lastName').enable();
    this.form.get('email').enable();
    this.form.get('phone').enable();
    // this.form.get('address').enable();
    this.isEdit = true;
  }

  saveForm(value) {
    const reqBody = {
      'serviceName': 'WSIOrderClientinfo',
      'updateClientInfo': {
        'AcctCurrency': '818',
        'ClientoptIn': [
          {
            'Type': '001',
            'status': '001'
          },
          {
            'Type': '002',
            'status': '001'
          }
        ],
        'channelInfo': {
          'AcquirerCountry': '818',
          'merchantName': 'android|9|d804da38-5f2c-4cde-9737-f0f6c53c4f52|1.0.0'
        },
        'clientInfo': {
          'DoB': '20200629',
          'clientNumber': this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.clientNumber,
          'email': value.email,
          'gender': '001',
          'mobileNumber': value.phone,
          firstName: value.firstName,
          lastName: value.lastName
        },
        'createOnClient': '002',
        'institutionNumber': '00000002',
        'processCode': '115000',
        'sourceID': '702000110001'
      }
    };
    this.api.call('POST', reqBody).subscribe((res: IUpdateClientInfoResponse) => {
      if (res.updateClientInfoResponse) {
        this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.email = res.updateClientInfoResponse.clientInfo.email;
        this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.firstName =
          res.updateClientInfoResponse.clientInfo.firstName;
        this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.lastName = res.updateClientInfoResponse.clientInfo.lastName;
        this.authService.loginedUserData.loginAuthenticationResponse.clientInfo.mobileNumber =
          res.updateClientInfoResponse.clientInfo.mobileNumber;
        this.authService.updateData();
        this.form.get('firstName').disable();
        this.form.get('lastName').disable();
        this.form.get('email').disable();
        this.form.get('phone').disable();
        this.form.get('address').disable();
        this.isEdit = false;
      } else {
        setTimeout(() => {
          this.saveForm(value);
        }, 500);
      }
    });

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
        this.hasAddress = true;
        this.addressForm.get('address').setValue(
          res.retrieveClientAddressResponse.clientAddressList.addrClientCity + ' , ' +
          res.retrieveClientAddressResponse.clientAddressList.addrLine1 + ' , ' +
          res.retrieveClientAddressResponse.clientAddressList.addrLine2 + ' , ' +
          res.retrieveClientAddressResponse.clientAddressList.addrLine7
        );
      } else {
        setTimeout(() => {
          this.getAddress();
        }, 500);
      }
    });
  }
}
