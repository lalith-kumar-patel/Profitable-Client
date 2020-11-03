import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetHistoryComponent } from './get-history.component';

describe('GetHistoryComponent', () => {
  let component: GetHistoryComponent;
  let fixture: ComponentFixture<GetHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
