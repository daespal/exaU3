import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'list-host',
    loadChildren: () => import('./list-host/list-host.module').then( m => m.ListHostPageModule)
  },
  {
    path: 'tap-huesped',
    loadChildren: () => import('./huesped/tap-huesped/tap-huesped.module').then( m => m.TapHuespedPageModule)
  },
  {
    path: 'view-huesped',
    loadChildren: () => import('./view-huesped/view-huesped.module').then( m => m.ViewHuespedPageModule)
  },
  {
    path: 'new-huesped',
    loadChildren: () => import('./new-huesped/new-huesped.module').then( m => m.NewHuespedPageModule)
  },
  {
    path: 'new-reservacion',
    loadChildren: () => import('./new-reservacion/new-reservacion.module').then( m => m.NewReservacionPageModule)
  },
  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then( m => m.CameraPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
