import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { StateManagementService, Stats } from '../../core/services/state-management.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * StatsComponent
 *
 * Displays comprehensive statistics about checks
 * FR30: Global progression (X / Total completed)
 * FR31: Progression by type
 * FR32: Progression by zone
 * FR33: Done/To Do perspectives
 * FR35: Zone drill-down to filtered checks view
 * NFR-UX-1: Stats support 50h+ sessions
 */
@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, CardModule, ProgressBarModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stats-container p-4">
      <h1 class="text-3xl font-bold mb-6">Statistics</h1>

      <!-- View Toggle: Done vs To Do -->
      <div class="view-toggle mb-6">
        <p-button
          [label]="showDone() ? 'View: Completed' : 'View: To Do'"
          [severity]="showDone() ? 'success' : 'primary'"
          (onClick)="toggleView()"
        />
      </div>

      <!-- Global Stats Card -->
      <p-card class="mb-6">
        <ng-template pTemplate="header">
          <div class="p-4">
            <h2 class="text-2xl font-semibold">Global Progress</h2>
          </div>
        </ng-template>

        <div class="flex flex-col gap-4">
          <div class="text-4xl font-bold text-center">
            {{ stats().completed }} / {{ stats().total }}
            <span class="text-2xl text-gray-600"
              >({{ stats().percentage.toFixed(1) }}%)</span
            >
          </div>

          <p-progressBar
            [value]="stats().percentage"
            [showValue]="false"
            styleClass="h-6"
          />

          @if (showDone()) {
            <div class="text-center text-lg text-green-600 font-medium">
              {{ stats().completed }} checks completed
            </div>
          } @else {
            <div class="text-center text-lg text-blue-600 font-medium">
              {{ stats().total - stats().completed }} checks remaining
            </div>
          }
        </div>
      </p-card>

      <!-- Stats by Type -->
      <p-card class="mb-6">
        <ng-template pTemplate="header">
          <div class="p-4">
            <h2 class="text-2xl font-semibold">Progress by Type</h2>
          </div>
        </ng-template>

        <div class="flex flex-col gap-4">
          @for (typeStats of stats().byType; track typeStats.type) {
            <div class="type-stat-item">
              <div class="flex justify-between mb-2">
                <span class="font-medium">{{ typeStats.type }}</span>
                @if (showDone()) {
                  <span class="text-green-600"
                    >{{ typeStats.completed }} / {{ typeStats.total }} ({{
                      typeStats.percentage.toFixed(1)
                    }}%)</span
                  >
                } @else {
                  <span class="text-blue-600"
                    >{{ typeStats.total - typeStats.completed }} remaining ({{
                      (100 - typeStats.percentage).toFixed(1)
                    }}%)</span
                  >
                }
              </div>
              <p-progressBar
                [value]="showDone() ? typeStats.percentage : 100 - typeStats.percentage"
                [showValue]="false"
              />
            </div>
          }
        </div>
      </p-card>

      <!-- Stats by Zone -->
      <p-card>
        <ng-template pTemplate="header">
          <div class="p-4">
            <h2 class="text-2xl font-semibold">Progress by Zone</h2>
          </div>
        </ng-template>

        <div class="flex flex-col gap-4">
          @for (zoneStats of stats().byZone; track zoneStats.zone) {
            <div
              class="zone-stat-item cursor-pointer hover:bg-gray-50 p-3 rounded transition-colors"
              (click)="drillDownToZone(zoneStats.zone)"
            >
              <div class="flex justify-between mb-2">
                <span class="font-medium text-blue-600 hover:underline"
                  >{{ zoneStats.zone }} →</span
                >
                @if (showDone()) {
                  <span class="text-green-600"
                    >{{ zoneStats.completed }} / {{ zoneStats.total }} ({{
                      zoneStats.percentage.toFixed(1)
                    }}%)</span
                  >
                } @else {
                  <span class="text-blue-600"
                    >{{ zoneStats.total - zoneStats.completed }} remaining ({{
                      (100 - zoneStats.percentage).toFixed(1)
                    }}%)</span
                  >
                }
              </div>
              <p-progressBar
                [value]="showDone() ? zoneStats.percentage : 100 - zoneStats.percentage"
                [showValue]="false"
              />
            </div>
          }
        </div>
      </p-card>
    </div>
  `,
  styles: [
    `
      .stats-container {
        max-width: 1200px;
        margin: 0 auto;
      }
    `,
  ],
})
export class StatsComponent {
  private stateService = inject(StateManagementService);
  private router = inject(Router);

  stats = signal<Stats>({
    total: 0,
    completed: 0,
    percentage: 0,
    byType: [],
    byZone: [],
  });

  showDone = signal(true); // FR33: Toggle Done/To Do perspective

  constructor() {
    // NFR-PERF-6: Use takeUntilDestroyed to prevent memory leaks
    this.stateService.stats$
      .pipe(takeUntilDestroyed())
      .subscribe((stats) => {
        this.stats.set(stats);
      });
  }

  /**
   * Toggle between Done and To Do perspectives
   * FR33: Show both perspectives
   */
  toggleView(): void {
    this.showDone.update((v) => !v);
  }

  /**
   * Drill down to checks filtered by zone
   * FR35: Zone drill-down navigation
   */
  drillDownToZone(zone: string): void {
    // Set zone filter and navigate to checks page
    this.stateService.updateFilters({ zone });
    this.router.navigate(['/checks']);
  }
}
