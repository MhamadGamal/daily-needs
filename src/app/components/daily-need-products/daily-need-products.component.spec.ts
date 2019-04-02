import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyNeedProductsComponent } from './daily-need-products.component';

describe('DailyNeedProductsComponent', () => {
  let component: DailyNeedProductsComponent;
  let fixture: ComponentFixture<DailyNeedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyNeedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyNeedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
