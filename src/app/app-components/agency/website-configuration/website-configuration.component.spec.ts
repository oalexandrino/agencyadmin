import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteConfigComponent } from './website-configuration.component';

describe('WebsiteConfigurationComponent', () => {
  let component: WebsiteConfigComponent;
  let fixture: ComponentFixture<WebsiteConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
