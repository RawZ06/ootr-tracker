import { Component, ChangeDetectionStrategy, signal, inject, viewChild } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { CommonModule } from '@angular/common';
import { StateManagementService } from './core/services/state-management.service';
import { SaveLoadService } from './core/services/save-load.service';
import { ImportDialogComponent } from './shared/components/import-dialog/import-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SaveData, SaveValidationResult } from './models/save-data.model';

/**
 * App
 *
 * Main application component with navigation and mini progress counter
 * FR34: Mini progress counter always visible
 * FR37-FR43: Save/Load functionality
 * Story 3.7, Stories 4.5-4.7
 */
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    BadgeModule,
    DialogModule,
    MessageModule,
    CommonModule,
    ImportDialogComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private stateService = inject(StateManagementService);
  private saveLoadService = inject(SaveLoadService);
  private router = inject(Router);

  importDialog = viewChild<ImportDialogComponent>('importDialog');

  // Mini progress counter (FR34)
  progressText = signal('0 / 0 (0%)');
  progressPercentage = signal(0);

  // Save/Load dialog states
  showLoadDialog = signal(false);
  loadErrors = signal<string[]>([]);
  loadMetadata = signal<{ save_date: string; total_checks: number; completed_checks: number } | null>(null);
  loadingSave = signal(false);
  selectedSaveData = signal<SaveData | null>(null);

  constructor() {
    // Subscribe to stats for mini progress counter
    this.stateService.stats$.pipe(takeUntilDestroyed()).subscribe((stats) => {
      const percentage = stats.percentage.toFixed(1);
      this.progressText.set(`${stats.completed} / ${stats.total} (${percentage}%)`);
      this.progressPercentage.set(stats.percentage);
    });
  }

  openImportDialog(): void {
    this.importDialog()?.open();
  }

  /**
   * Export save file
   * FR37: Export save with download
   * Story 4.5
   */
  exportSave(): void {
    this.saveLoadService.exportSave().subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const date = new Date().toISOString().split('T')[0];
      link.download = `notesallsanity-save-${date}.json`;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  /**
   * Open file picker for import
   * FR38: Import save with validation
   * Story 4.6
   */
  importSave(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      this.loadingSave.set(true);
      this.showLoadDialog.set(true);
      this.loadErrors.set([]);
      this.loadMetadata.set(null);

      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        
        this.saveLoadService.validateSave(content).subscribe((result: SaveValidationResult) => {
          this.loadingSave.set(false);

          if (!result.valid) {
            // FR41: Display validation errors
            this.loadErrors.set(result.errors);
          } else {
            // FR43: Show metadata for confirmation
            const saveData: SaveData = JSON.parse(content);
            this.selectedSaveData.set(saveData);
            this.loadMetadata.set({
              save_date: saveData.save_date,
              total_checks: saveData.metadata.total_checks,
              completed_checks: saveData.metadata.completed_checks,
            });
          }
        });
      };
      reader.readAsText(file);
    };
    input.click();
  }

  /**
   * Confirm and execute import
   * FR38, FR43: Import with confirmation
   * Story 4.7
   */
  confirmImport(): void {
    const saveData = this.selectedSaveData();
    if (!saveData) return;

    this.loadingSave.set(true);
    this.saveLoadService.importSave(saveData).subscribe(() => {
      this.loadingSave.set(false);
      this.showLoadDialog.set(false);
      this.router.navigate(['/checks']);
    });
  }

  /**
   * Cancel import dialog
   * NFR-REL-3: State protection
   */
  cancelImport(): void {
    this.showLoadDialog.set(false);
    this.loadErrors.set([]);
    this.loadMetadata.set(null);
    this.selectedSaveData.set(null);
  }
}
