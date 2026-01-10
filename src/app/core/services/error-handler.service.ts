import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppError } from '../../models/app-error.model';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  constructor(private messageService: MessageService) {}

  showError(error: AppError): void {
    // TODO: Story 2.5 - Implement error display with toast
    this.messageService.add({
      severity: 'error',
      summary: error.title,
      detail: error.message,
      life: 5000
    });
  }

  showSuccess(message: string): void {
    // TODO: Story 2.5 - Implement success message
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: message,
      life: 3000
    });
  }
}
