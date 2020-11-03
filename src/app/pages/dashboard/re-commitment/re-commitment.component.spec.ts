import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReCommitmentComponent } from './re-commitment.component';

describe('ReCommitmentComponent', () => {
  let component: ReCommitmentComponent;
  let fixture: ComponentFixture<ReCommitmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReCommitmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReCommitmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
