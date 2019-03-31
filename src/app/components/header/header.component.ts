import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from 'ng6-bootstrap-modal';
import { ModalSignupComponent } from '../modal-signup/modal-signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() lang;
  @Input() isLogged;
  public signIn = 'ssss';
  constructor(private dialogService: DialogService) { 
   
  }

  ngOnInit() {
  }

  showConfirm() {
    let disposable = this.dialogService.addDialog(ModalSignupComponent, {
        lang: this.lang})
        .subscribe((isConfirmed)=>{
            //We get dialog result
            if(isConfirmed) {
                alert('accepted');
            }
            else {
                alert('declined');
            }
        });
}

}
