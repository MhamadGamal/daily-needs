import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-min-header',
  templateUrl: './min-header.component.html',
  styleUrls: ['./min-header.component.css']
})
export class MinHeaderComponent implements OnInit {
  
  @Input() lang;
  constructor() { }

  ngOnInit() {
  }

}
