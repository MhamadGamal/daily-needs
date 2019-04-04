import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'app-popular-post',
  templateUrl: './popular-post.component.html',
  styleUrls: ['./popular-post.component.css']
})
export class PopularPostComponent implements OnInit {
  @Input() lang;
  constructor() { }

  ngOnInit() {
  }

}
