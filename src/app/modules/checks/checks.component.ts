import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollerModule } from 'primeng/scroller';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { StateManagementService } from '../../core/services/state-management.service';
import { Check } from '../../models/check.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * ChecksComponent
 *
 * Displays all checks with virtual scrolling for performance
 * FR6: Display checks list
 * FR7, FR8, FR9: Multi-criteria filtering (zone, type, hide completed)
 * FR10, FR11: Toggle check done/not done with click
 * FR13: Reset filters functionality
 * FR14: Show check name exactly as in spoiler.json
 * NFR-PERF-1: Filtering <100ms (target <50ms)
 * NFR-PERF-3: 60 FPS scrolling with 3000+ items
 * NFR-PERF-5: Instantaneous toggle (<50ms)
 * NFR-REL-5: Handles 3000+ checks without crashes
 */
@Component({
  selector: 'app-checks',
  standalone: true,
  imports: [CommonModule, ScrollerModule, SelectModule, ButtonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="checks-container p-4">
      <h1 class="text-3xl font-bold mb-6">Checks</h1>

      <!-- Filters Section -->
      <div class="filters-section flex gap-4 mb-4 flex-wrap items-end">
        <!-- Zone Filter -->
        <div class="filter-item flex flex-col gap-2">
          <label for="zone-filter" class="text-sm font-medium">Zone</label>
          <p-select
            inputId="zone-filter"
            [(ngModel)]="selectedZone"
            [options]="zoneOptions()"
            (onChange)="onZoneChange($event.value)"
            placeholder="All Zones"
            [showClear]="true"
            styleClass="w-64"
          />
        </div>

        <!-- Type Filter -->
        <div class="filter-item flex flex-col gap-2">
          <label for="type-filter" class="text-sm font-medium">Type</label>
          <p-select
            inputId="type-filter"
            [(ngModel)]="selectedType"
            [options]="typeOptions()"
            (onChange)="onTypeChange($event.value)"
            placeholder="All Types"
            [showClear]="true"
            styleClass="w-64"
          />
        </div>

        <!-- Hide Completed Toggle -->
        <div class="filter-item">
          <p-button
            [label]="hideCompleted() ? 'Show All' : 'Hide Completed'"
            [severity]="hideCompleted() ? 'secondary' : 'primary'"
            (onClick)="onToggleHideCompleted()"
            [outlined]="!hideCompleted()"
          />
        </div>

        <!-- Reset Filters Button -->
        <div class="filter-item">
          <p-button
            label="Reset Filters"
            severity="secondary"
            [outlined]="true"
            (onClick)="onResetFilters()"
          />
        </div>

        <!-- Results Count -->
        <div class="filter-item flex items-center text-sm text-gray-600 ml-auto">
          <span class="font-medium">{{ checks.length }} checks</span>
        </div>
      </div>

      <p-scroller
        [items]="checks"
        [itemSize]="50"
        scrollHeight="calc(100vh - 280px)"
        styleClass="border border-gray-300 rounded"
      >
        <ng-template pTemplate="item" let-check>
          <div
            class="check-item flex items-center gap-4 p-3 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
            style="height: 50px"
            (click)="onToggleCheck(check.id)"
            [class.bg-green-50]="check.isDone"
          >
            <div class="flex-1">
              <div class="font-medium" [class.line-through]="check.isDone">
                {{ check.name }}
              </div>
              <div class="text-sm text-gray-600">
                {{ check.zone }} • {{ check.type }}
              </div>
            </div>
            <div class="check-status">
              @if (check.isDone) {
                <span class="text-green-600 font-bold">✅ Done</span>
              } @else {
                <span class="text-gray-400">⬜ Not Done</span>
              }
            </div>
          </div>
        </ng-template>
      </p-scroller>
    </div>
  `,
  styles: [
    `
      .checks-container {
        height: 100%;
      }
    `,
  ],
})
export class ChecksComponent {
  private stateService = inject(StateManagementService);

  checks: Check[] = [];
  zoneOptions = signal<{ label: string; value: string }[]>([]);
  typeOptions = signal<{ label: string; value: string }[]>([]);
  hideCompleted = signal(false);

  selectedZone: string | null = null;
  selectedType: string | null = null;

  constructor() {
    // NFR-PERF-6: Use takeUntilDestroyed to prevent memory leaks
    this.stateService.filteredChecks$
      .pipe(takeUntilDestroyed())
      .subscribe((checks) => {
        this.checks = checks;
      });

    // Load filter options when checks are loaded
    this.stateService.checks$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.loadFilterOptions();
    });

    // Subscribe to filter state for UI sync
    this.stateService.filters$.pipe(takeUntilDestroyed()).subscribe((filters) => {
      this.selectedZone = filters.zone;
      this.selectedType = filters.type;
      this.hideCompleted.set(filters.hideCompleted);
    });
  }

  /**
   * Load unique zones and types for filter dropdowns
   * FR7, FR8: Populate filter options
   */
  private loadFilterOptions(): void {
    const zones = this.stateService.getUniqueZones();
    const types = this.stateService.getUniqueTypes();

    this.zoneOptions.set(zones.map((z) => ({ label: z, value: z })));
    this.typeOptions.set(types.map((t) => ({ label: t, value: t })));
  }

  /**
   * Toggle check done/not done state
   * FR10, FR11: Mark checks with click
   * NFR-PERF-5: Instantaneous toggle (<50ms)
   */
  onToggleCheck(checkId: string): void {
    this.stateService.toggleCheck(checkId);
  }

  /**
   * Handle zone filter change
   * FR7: Zone filtering
   */
  onZoneChange(zone: string | null): void {
    this.stateService.updateFilters({ zone });
  }

  /**
   * Handle type filter change
   * FR8: Type filtering
   */
  onTypeChange(type: string | null): void {
    this.stateService.updateFilters({ type });
  }

  /**
   * Toggle hide completed checks
   * FR12: Hide completed functionality
   */
  onToggleHideCompleted(): void {
    this.stateService.updateFilters({ hideCompleted: !this.hideCompleted() });
  }

  /**
   * Reset all filters to default
   * FR13: Reset filters
   */
  onResetFilters(): void {
    this.stateService.resetFilters();
    this.selectedZone = null;
    this.selectedType = null;
  }
}
