import { TestBed } from '@angular/core/testing';
import { PathfindingService } from './pathfinding.service';

describe('PathfindingService', () => {
  let service: PathfindingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PathfindingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have calculatePath method', () => {
    expect(service.calculatePath).toBeDefined();
  });

  it('should have clearCache method', () => {
    expect(service.clearCache).toBeDefined();
  });
});
