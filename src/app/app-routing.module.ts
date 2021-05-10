import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard, SkipIfAuthenticatedGuard } from './security';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login').then(m => m.LoginModule),
    canActivate: [SkipIfAuthenticatedGuard],
    data: {
      continueToRoute: ['/dashboard'],
      idleOff: true // the idle timeout component uses this value to turn on/off the timer (it's an opt-out thing)
    }
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '*', redirectTo: 'dashboard', pathMatch: 'full' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
