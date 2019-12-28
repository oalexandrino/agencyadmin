import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAgencywebsiteItemsComponent } from './card-agencywebsite-items.component';

describe('CardAgencywebsiteItemsComponent', () => {
  let component: CardAgencywebsiteItemsComponent;
  let fixture: ComponentFixture<CardAgencywebsiteItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAgencywebsiteItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAgencywebsiteItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
