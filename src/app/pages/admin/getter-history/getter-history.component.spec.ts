import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetterHistoryComponent } from './getter-history.component';

describe('GetterHistoryComponent', () => {
  let component: GetterHistoryComponent;
  let fixture: ComponentFixture<GetterHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetterHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetterHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
