import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotfDialogComponent } from './notf-dialog.component';

describe('NotfDialogComponent', () => {
  let component: NotfDialogComponent;
  let fixture: ComponentFixture<NotfDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotfDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotfDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
