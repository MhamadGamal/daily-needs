import { Component, OnInit, Input } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.css']
})

export class AddNewAddressComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  expandDivNewAddress() {
    $('#newAddress').toggleClass('collapse', 'collapse in');
  }
}
