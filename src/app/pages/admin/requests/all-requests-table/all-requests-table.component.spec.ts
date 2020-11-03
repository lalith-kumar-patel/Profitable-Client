import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRequestsTableComponent } from './all-requests-table.component';

describe('AllRequestsTableComponent', () => {
  let component: AllRequestsTableComponent;
  let fixture: ComponentFixture<AllRequestsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRequestsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
