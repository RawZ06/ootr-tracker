import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have theme$ observable', () => {
    expect(service.theme$).toBeDefined();
  });

  it('should have toggleTheme method', () => {
    expect(service.toggleTheme).toBeDefined();
  });
});
