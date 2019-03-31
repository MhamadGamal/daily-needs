import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng6-bootstrap-modal";
import { FormControl, Validators } from '@angular/forms';

export interface SignUpModal {
  lang:string;
}

@Component({
  selector: 'app-modal-signup',
  templateUrl: './modal-signup.component.html',
  styleUrls: ['./modal-signup.component.css']
})
export class ModalSignupComponent extends DialogComponent<SignUpModal, boolean> implements SignUpModal {
  lang: string;

  constructor(dialogService: DialogService) { 
    super(dialogService);
    
  }

  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    this.result = true;
    this.close();
  }


}
