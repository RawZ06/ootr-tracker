import { TestBed } from '@angular/core/testing';
import { MetadataService } from './metadata.service';

describe('MetadataService', () => {
  let service: MetadataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetadataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have loadMetadata method', () => {
    expect(service.loadMetadata).toBeDefined();
  });

  it('should have getCheckInfo method', () => {
    expect(service.getCheckInfo).toBeDefined();
  });

  it('should have getZones method', () => {
    expect(service.getZones).toBeDefined();
  });

  it('should have getTypes method', () => {
    expect(service.getTypes).toBeDefined();
  });
});
