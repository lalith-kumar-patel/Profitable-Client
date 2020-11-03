import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideHistoryComponent } from './provide-history.component';

describe('ProvideHistoryComponent', () => {
  let component: ProvideHistoryComponent;
  let fixture: ComponentFixture<ProvideHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvideHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvideHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
