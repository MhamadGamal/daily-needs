import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public pageName:string = "account";
  public lang:string = environment.lang;
  public isLogged:boolean = false;

  public form = new FormGroup({
    firstName: new FormControl({value: 'Shreen', disabled: true}, [Validators.required]),
    lastName: new FormControl({value: 'Abdou', disabled: true}, [Validators.required]),
    email: new FormControl({value: 'shreen@gmail.com', disabled: true}, [Validators.required]),
    phone: new FormControl({value: '10000222556', disabled: true}, [Validators.required]),
    address: new FormControl({value: ['Address one' , 'Address two'], disabled: true}, [Validators.required]),
 });;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(this.lang); 
    let token = localStorage.getItem('token');
    if(token){
        this.isLogged = true ;
    }
  }

  editForm(){
    this.form.get('firstName').enable();
    this.form.get('lastName').enable();
    this.form.get('email').enable();
    this.form.get('phone').enable();
    this.form.get('address').enable();
    $('.icon-control > i').each(function (){
      $(this).removeClass('d-none');
    });
    $('.controlBtnSave').removeClass('d-none');
    $('.controlBtnEdit').addClass('d-none');
  }

  saveForm(){
    console.log('save');
    this.form.get('firstName').disable();
    this.form.get('lastName').disable();
    this.form.get('email').disable();
    this.form.get('phone').disable();
    this.form.get('address').disable();
    $('.icon-control > i').each(function (){
      $(this).addClass('d-none');
    });
    $('.controlBtnEdit').removeClass('d-none');
    $('.controlBtnSave').addClass('d-none');
  }

  ngOnInit() {
  }

}
