import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'checks',
    pathMatch: 'full'
  },
  {
    path: 'checks',
    loadComponent: () => import('./modules/checks/checks.component').then(m => m.ChecksComponent)
  },
  {
    path: 'entrances',
    loadComponent: () =>
      import('./modules/entrances/entrances.component').then(m => m.EntrancesComponent)
  },
  {
    path: 'pathfinding',
    loadComponent: () =>
      import('./modules/pathfinding/pathfinding.component').then(m => m.PathfindingComponent)
  },
  {
    path: 'stats',
    loadComponent: () => import('./modules/stats/stats.component').then(m => m.StatsComponent)
  },
  {
    path: '**',
    redirectTo: 'checks'
  }
];
