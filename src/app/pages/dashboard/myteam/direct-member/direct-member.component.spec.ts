import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectMemberComponent } from './direct-member.component';

describe('DirectMemberComponent', () => {
  let component: DirectMemberComponent;
  let fixture: ComponentFixture<DirectMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
