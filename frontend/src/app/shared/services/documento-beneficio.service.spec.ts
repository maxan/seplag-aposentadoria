import { TestBed } from '@angular/core/testing';

import { DocumentoBeneficioService } from './documento-beneficio.service';

describe('DocumentoBeneficioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocumentoBeneficioService = TestBed.get(DocumentoBeneficioService);
    expect(service).toBeTruthy();
  });
});
