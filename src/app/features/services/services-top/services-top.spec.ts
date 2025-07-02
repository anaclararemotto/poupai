import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesTop } from './services-top';

describe('ServicesTop', () => {
  let component: ServicesTop;
  let fixture: ComponentFixture<ServicesTop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesTop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesTop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
