import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LangService } from 'src/app/shared/services/lang.service';


@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactForm: FormGroup
  lang: string;
  subscription: Subscription = new Subscription();
  constructor(private translate: TranslateService, private langS: LangService,
    private formBuilder: FormBuilder
  ) {
    this.subscription.add(
      this.langS.lang.subscribe(lang => {
        this.translate.use(lang);
        this.lang = lang;
      }));

  }


  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      subject: [null, [Validators.required]],
      message: [null, [Validators.required]],
    });
  }

}
