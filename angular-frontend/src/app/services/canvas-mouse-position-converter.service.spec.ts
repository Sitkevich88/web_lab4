import { TestBed } from '@angular/core/testing';

import { CanvasMousePositionConverterService } from './canvas-mouse-position-converter.service';

describe('CanvasMousePositionConverterService', () => {
  let service: CanvasMousePositionConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanvasMousePositionConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
