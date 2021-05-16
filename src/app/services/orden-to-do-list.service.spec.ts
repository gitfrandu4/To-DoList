import { TestBed } from '@angular/core/testing';

import { OrdenToDoListService } from './orden-to-do-list.service';

describe('OrdenToDoListService', () => {
  let service: OrdenToDoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdenToDoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
