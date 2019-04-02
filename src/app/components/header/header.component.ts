import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from 'ng6-bootstrap-modal';
import { ModalSignupComponent } from '../modal-signup/modal-signup.component';
import { ModalSigninComponent } from '../modal-signin/modal-signin.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() lang;
  @Input() isLogged;
  @Input() pageName;
  public switchLang = 'ar';
  

  constructor(private dialogService: DialogService) {

  }

  ngOnInit() {
    this.lang == 'ar' ? this.switchLang = 'en' : this.switchLang = 'ar';
    console.log(this.switchLang);
  }

  showModal(modalType) {
    if (modalType == 'signup')
    {
        let disposable = this.dialogService.addDialog(ModalSignupComponent, 
          { lang: this.lang  }).subscribe((isConfirmed) => {
                //We get dialog result
                if (isConfirmed) {
                  alert('accepted');
                }
                else {
                  alert('declined');
                }
          });
    }
    else if (modalType == 'signin') 
    {
      let disposable = this.dialogService.addDialog(ModalSigninComponent, 
        { lang: this.lang  }).subscribe((isConfirmed) => {
              //We get dialog result
              if (isConfirmed) {
                alert('accepted');
              }
              else {
                alert('declined');
              }
        });
    }

  }

}
