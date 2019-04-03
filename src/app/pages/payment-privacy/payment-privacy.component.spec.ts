import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPrivacyComponent } from './payment-privacy.component';

describe('PaymentPrivacyComponent', () => {
  let component: PaymentPrivacyComponent;
  let fixture: ComponentFixture<PaymentPrivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentPrivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
