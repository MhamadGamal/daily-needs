import { AuthService } from './../../shared/services/auth.service';
import { ApiInterceptorService } from './../../shared/interceptor/api-interceptor.service';
import { Component, OnDestroy } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LangService } from 'src/app/shared/services/lang.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, Observable } from 'rxjs';
import { IClientRegisterResponse, UpdateClientInfoResponse } from 'src/app/shared/models/logined-user-data';
import { RefreshTokenService } from 'src/app/shared/services/refreshtoken.service';
import { ModalSigninComponent } from '../modal-signin/modal-signin.component';


@Component({
  selector: 'app-modal-signup',
  templateUrl: './modal-signup.component.html',
  styleUrls: ['./modal-signup.component.css']
})
export class ModalSignupComponent implements OnDestroy {
  verId: number;
  mobile;
  signupForm: FormGroup;
  verficationForm: FormGroup;
  showVer: boolean;
  userData: any;
  language: string;
  err: boolean;
  errMsg: string;
  subscription: Subscription = new Subscription();
  constructor(
    public activeModal: NgbActiveModal,
    private langS: LangService,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private api: ApiInterceptorService,
    private authService: AuthService,
    private refreshToken: RefreshTokenService
  ) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.language = lang;
      }));
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      cPassword: [null, [Validators.required]],
      fname: [null, [Validators.required]],
      lname: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
    },
      {
        validator: this.checkPasswordMatching
      }
    );
    this.verficationForm = this.formBuilder.group({
      code: [null, [Validators.required]]
    });
  }
  checkPasswordMatching(form: FormGroup) {
    const pass = form.get('password').value;
    const cPass = form.get('cPassword').value;
    return pass === cPass ? null : { passwordNotMAtched: true };
  }
  signup(value) {
    this.mobile = '+2' + value.phone;
    this.userData = value;
    this.userData.phone = this.mobile;
    const reqBody = {
      'clientRegister': {
        'channelInfo': {
          'AcquirerCountry': '818',
          'merchantName': 'android|9|86ea2fca-f89c-4a84-bb27-af7c565a7793|1.0.0'
        },
        'clientInfo': {
          'mobileNumber': this.mobile
        },
        'createOnClient': '002',
        'institutionNumber': '00000002',
        'processCode': '100000',
        'sourceID': '702000110001'
      },
      'serviceName': 'WSIOrderClientinfo'
    };
    this.api.call('POST', reqBody).then((obs: Observable<any>) => {
      obs.subscribe((res: any) => {
        console.log(res);
        this.verId = res.clientRegisterResponse.verificationHistID;
        this.showVer = true;
      });
    });
  }


  verfication(vCode) {
    const verBody = {
      'clientRegister': {
        'channelInfo': {
          'AcquirerCountry': '818',
          'merchantName': 'android|9|847d6aff-caa2-40cb-af80-63ecc9c74469|1.0.0'
        },
        'clientInfo': {
          'mobileNumber': this.mobile
        },
        'createOnClient': '002',
        'institutionNumber': '00000002',
        'processCode': '101000',
        'sourceID': '702000110001',
        'verificationCode': vCode,
        'verificationHistID': this.verId
      },
      'serviceName': 'WSIOrderClientinfo'
    };
    this.api.call('POST', verBody).then((obs: Observable<any>) => {
      obs.subscribe((res: any) => {
        if (res) {
          this.updateProfile(vCode);
        }
      });
    });
  }
  updateProfile(vCode) {
    const reqBody = {
      'clientRegister': {
        'AcctCurrency': '818',
        'ClientoptIn': [
          {
            'Type': '001',
            'status': '001'
          },
          {
            'Type': '002',
            'status': '001'
          },
          {
            'Type': 'promoCode'
          }
        ],
        'authenticationType': '6',
        'channelInfo': {
          'AcquirerCountry': '818',
          'merchantName': 'android|9|66fe1944-36ab-4eb5-ade7-5672a1fa3f82|1.0.0'
        },
        'clientInfo': {
          'DoB': '20200629',
          'email': this.userData.email,
          'gender': '001',
          'lang': this.language,
          'password': this.userData.password,
          'mobileNumber': this.userData.phone,
          firstName: this.userData.fname,
          lastName: this.userData.lname,
          'shortName': this.userData.fname + ' ' + this.userData.lname
        },
        'createOnClient': '002',
        'institutionNumber': '00000002',
        'processCode': '110000',
        'sourceID': '702000110001',
        'verificationCode': vCode,
        'verificationHistID': this.verId
      },
      'serviceName': 'WSIOrderClientinfo'
    };
    this.api.call('POST', reqBody).then((obs: Observable<IClientRegisterResponse>) => {
      obs.subscribe((res: IClientRegisterResponse) => {
        this.refreshToken.authToken = res.token;
        this.updateName(res.clientRegisterResponse.clientInfo.clientNumber);
      });
    });
  }
  updateName(num) {
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
          'clientNumber': num,
          'email': this.userData.email,
          'gender': '001',
          'mobileNumber': this.userData.phone,
          firstName: this.userData.fname,
          lastName: this.userData.lname
        },
        'createOnClient': '002',
        'institutionNumber': '00000002',
        'processCode': '115000',
        'sourceID': '702000110001'
      }
    };
    this.api.call('POST', reqBody).then((obs: Observable<UpdateClientInfoResponse>) => {
      obs.subscribe((res: UpdateClientInfoResponse) => {
        const login = new ModalSigninComponent(
          this.activeModal, this.langS, this.translate, this.formBuilder, this.api, this.authService, this.refreshToken);
        login.login({
          email: this.userData.email,
          password: this.userData.password,
        });
      });
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
