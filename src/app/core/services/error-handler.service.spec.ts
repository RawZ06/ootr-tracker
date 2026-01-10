import { TestBed } from '@angular/core/testing';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      providers: [ErrorHandlerService, { provide: MessageService, useValue: mockMessageService }]
    });
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have showError method', () => {
    expect(service.showError).toBeDefined();
  });

  it('should have showSuccess method', () => {
    expect(service.showSuccess).toBeDefined();
  });
});
