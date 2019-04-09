import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritHealthinfoComponent } from './favourit-healthinfo.component';

describe('FavouritHealthinfoComponent', () => {
  let component: FavouritHealthinfoComponent;
  let fixture: ComponentFixture<FavouritHealthinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouritHealthinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouritHealthinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
