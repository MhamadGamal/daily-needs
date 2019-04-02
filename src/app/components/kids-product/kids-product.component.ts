import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-kids-product',
  templateUrl: './kids-product.component.html',
  styleUrls: ['./kids-product.component.css']
})
export class KidsProductComponent implements OnInit {

  @Input() lang;
  constructor() { }

  ngOnInit() {
  }

}
