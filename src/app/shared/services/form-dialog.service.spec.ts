import { TestBed } from '@angular/core/testing';

import { FormDialogService } from './form-dialog.service';

describe('FormDialogService', () => {
  let service: FormDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
