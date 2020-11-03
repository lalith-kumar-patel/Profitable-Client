import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMembersComponent } from './all-members.component';

describe('AllMembersComponent', () => {
  let component: AllMembersComponent;
  let fixture: ComponentFixture<AllMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
