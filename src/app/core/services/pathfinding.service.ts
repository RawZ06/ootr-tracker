import { Injectable } from '@angular/core';

interface PathContext {
  age: 'Child' | 'Adult';
  hasSaveWarp: boolean;
}

interface PathResult {
  steps: string[];
  distance: number;
}

@Injectable({ providedIn: 'root' })
export class PathfindingService {
  private cache = new Map<string, PathResult>();

  constructor() {}

  calculatePath(_from: string, _to: string, _context: PathContext): PathResult {
    // TODO: Story 7.3 - Implement Dijkstra algorithm
    return { steps: [], distance: 0 };
  }

  clearCache(): void {
    // TODO: Story 7.5 - Implement cache clearing
    this.cache.clear();
  }

  private dijkstra(_from: string, _to: string, _context: PathContext): PathResult {
    // TODO: Story 7.3 - Implement Dijkstra core algorithm
    return { steps: [], distance: 0 };
  }
}
