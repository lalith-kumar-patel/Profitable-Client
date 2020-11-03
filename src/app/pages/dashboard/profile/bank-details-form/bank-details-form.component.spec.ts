import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDetailsFormComponent } from './bank-details-form.component';

describe('BankDetailsFormComponent', () => {
  let component: BankDetailsFormComponent;
  let fixture: ComponentFixture<BankDetailsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankDetailsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
