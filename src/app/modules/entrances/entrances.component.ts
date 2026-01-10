import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entrances',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="module-placeholder">
      <h1>Entrances Module</h1>
      <p>This is a placeholder component for the Entrances module.</p>
      <p>Will be implemented in Epic 3.</p>
    </div>
  `,
  styles: [
    `
      .module-placeholder {
        padding: 2rem;
        text-align: center;
      }
      h1 {
        color: var(--primary-color);
        margin-bottom: 1rem;
      }
    `
  ]
})
export class EntrancesComponent {}
