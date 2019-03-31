import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinHeaderComponent } from './min-header.component';

describe('MinHeaderComponent', () => {
  let component: MinHeaderComponent;
  let fixture: ComponentFixture<MinHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
