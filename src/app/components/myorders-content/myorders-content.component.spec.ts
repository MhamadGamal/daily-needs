import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyordersContentComponent } from './myorders-content.component';

describe('MyordersContentComponent', () => {
  let component: MyordersContentComponent;
  let fixture: ComponentFixture<MyordersContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyordersContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyordersContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
