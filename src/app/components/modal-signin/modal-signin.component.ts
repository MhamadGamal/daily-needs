import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng6-bootstrap-modal";

export interface SignInModal {
  lang:string;
}

@Component({
  selector: 'app-modal-signin',
  templateUrl: './modal-signin.component.html',
  styleUrls: ['./modal-signin.component.css']
})
export class ModalSigninComponent extends DialogComponent<SignInModal, boolean> implements SignInModal {
  lang: string;

  constructor(dialogService: DialogService) { 
    super(dialogService);
    
  }

}
