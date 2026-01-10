import { TestBed } from '@angular/core/testing';
import { StateManagementService } from './state-management.service';

describe('StateManagementService', () => {
  let service: StateManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have checks$ observable', () => {
    expect(service.checks$).toBeDefined();
  });

  it('should have entrances$ observable', () => {
    expect(service.entrances$).toBeDefined();
  });

  it('should have filters$ observable', () => {
    expect(service.filters$).toBeDefined();
  });

  it('should have toggleCheck method', () => {
    expect(service.toggleCheck).toBeDefined();
  });

  it('should have addEntrance method', () => {
    expect(service.addEntrance).toBeDefined();
  });

  it('should have updateFilters method', () => {
    expect(service.updateFilters).toBeDefined();
  });

  it('should have loadState method', () => {
    expect(service.loadState).toBeDefined();
  });

  it('should have resetState method', () => {
    expect(service.resetState).toBeDefined();
  });
});
