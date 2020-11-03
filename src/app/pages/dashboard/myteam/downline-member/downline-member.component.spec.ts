import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownlineMemberComponent } from './downline-member.component';

describe('DownlineMemberComponent', () => {
  let component: DownlineMemberComponent;
  let fixture: ComponentFixture<DownlineMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownlineMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownlineMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
