import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from './../../shared/services/lang.service';
import { Subscription, Observable } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiInterceptorService } from 'src/app/shared/interceptor/api-interceptor.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RefreshTokenService } from 'src/app/shared/services/refreshtoken.service';
import { IloginedUserData } from 'src/app/shared/models/logined-user-data';



@Component({
  selector: 'app-modal-signin',
  templateUrl: './modal-signin.component.html',
  styleUrls: ['./modal-signin.component.css']
})

export class ModalSigninComponent implements OnDestroy {
  subscription: Subscription = new Subscription();
  loginForm: FormGroup;
  err: boolean;
  errMsg: string;
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
      }));
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }
  login(value) {
    const reqBody = {
      'loginAuthentication': {
        'additionalData': [
          {
            'lang': 'EN'
          }
        ],
        'authType': {
          'Type': '6'
        },
        'channelInfo': {
          'AcquirerCountry': '818',
          'merchantName': 'android|9|125229c6-9333-41bc-bf54-33645dd8abfc|1.0.0'
        },
        'clientInfo': {
          'password': value.password,
          'email': value.email
        },
        'institutionNumber': '00000002',
        'processCode': '200000',
        'sourceID': '702000110001'
      },
      'serviceName': 'WSIOrderClientinfo'
    };
    this.api.call('POST', reqBody).then((obs: Observable<IloginedUserData>) => {
      obs.subscribe((res: IloginedUserData) => {
        console.log(res);
        if (res.loginAuthenticationResponse.MessageText === 'Approved') {
          this.authService.loginedUserData = res;
          this.activeModal.dismiss('Cross click');
        } else {

          this.errMsg = res.loginAuthenticationResponse.MessageText;
          this.err = true;
        }
      });
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
