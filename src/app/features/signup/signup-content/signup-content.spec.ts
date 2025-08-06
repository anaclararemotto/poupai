import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupContent } from './signup-content';

describe('SignupContent', () => {
  let component: SignupContent;
  let fixture: ComponentFixture<SignupContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
