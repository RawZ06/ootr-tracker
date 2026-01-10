import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule, FileSelectEvent } from 'primeng/fileupload';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { MetadataService } from '../../../core/services/metadata.service';
import { SpoilerParserService } from '../../../core/services/spoiler-parser.service';
import { StateManagementService } from '../../../core/services/state-management.service';

/**
 * ImportDialogComponent
 *
 * File upload dialog for importing spoiler.json
 * FR1: Import spoiler.json
 */
@Component({
  selector: 'app-import-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    FileUploadModule,
    ProgressSpinnerModule,
    MessageModule,
  ],
  template: `
    <p-dialog
      [(visible)]="visible"
      [modal]="true"
      [style]="{ width: '50vw' }"
      header="Import Spoiler.json"
    >
      @if (loading()) {
        <div class="flex flex-col items-center gap-4 p-8">
          <p-progressSpinner />
          <p class="text-lg">Parsing spoiler.json...</p>
        </div>
      } @else {
        <div class="flex flex-col gap-4">
          @if (error()) {
            <p-message severity="error" [text]="error()!" />
          }

          @if (unmappedCount() > 0) {
            <p-message
              severity="warn"
              [text]="'Warning: ' + unmappedCount() + ' unmapped checks will be labeled as Unknown Zone/Type (FR50)'"
            />
          }

          <p-fileUpload
            mode="basic"
            accept=".json"
            [maxFileSize]="10000000"
            [auto]="true"
            chooseLabel="Select spoiler.json"
            (onSelect)="onFileSelect($event)"
          />

          <p class="text-sm text-gray-600">
            Select your OOT Randomizer spoiler.json file to import checks and entrances.
          </p>
        </div>
      }

      <ng-template pTemplate="footer">
        <p-button
          label="Cancel"
          severity="secondary"
          (onClick)="visible.set(false)"
        />
      </ng-template>
    </p-dialog>
  `,
})
export class ImportDialogComponent {
  private metadataService = inject(MetadataService);
  private spoilerParserService = inject(SpoilerParserService);
  private stateService = inject(StateManagementService);

  visible = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);
  unmappedCount = signal(0);

  open() {
    this.visible.set(true);
    this.error.set(null);

    // Load metadata if not already loaded
    if (!this.metadataService.isLoaded()) {
      this.metadataService.loadMetadata().subscribe();
    }
  }

  onFileSelect(event: FileSelectEvent) {
    const file = event.files[0];
    if (!file) return;

    this.loading.set(true);
    this.error.set(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;

        // Validate format
        const validation = this.spoilerParserService.validateFormat(content);
        if (!validation.valid) {
          this.error.set(`Invalid spoiler.json: ${validation.errors.join(', ')}`);
          this.loading.set(false);
          return;
        }

        // Parse spoiler
        this.spoilerParserService.parseSpoiler(content).subscribe({
          next: (data) => {
            // FR51: Count unmapped checks (zone/type = Unknown)
            const unmapped = data.checks.filter(
              (c) => c.zone === 'Unknown Zone' || c.type === 'Unknown Type'
            ).length;
            this.unmappedCount.set(unmapped);

            // FR5: Load data into state management
            this.stateService.loadData({ checks: data.checks, entrances: data.entrances });

            console.log(
              `Imported ${data.checks.length} checks (${unmapped} unmapped) and ${data.entrances.length} entrances`
            );
            this.loading.set(false);
            this.visible.set(false);
          },
          error: (err) => {
            this.error.set(`Failed to parse: ${err.message}`);
            this.loading.set(false);
          },
        });
      } catch {
        this.error.set('Failed to read file');
        this.loading.set(false);
      }
    };

    reader.readAsText(file);
  }
}
