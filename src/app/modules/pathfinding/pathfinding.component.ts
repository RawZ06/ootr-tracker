import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pathfinding',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="module-placeholder">
      <h1>Pathfinding Module</h1>
      <p>This is a placeholder component for the Pathfinding module.</p>
      <p>Will be implemented in Epic 7.</p>
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
export class PathfindingComponent {}
