import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { TrackDetail } from './track-detail/track-detail';
import { Login } from './login/login';
import { environment } from '../environements/environement';
import { TrackFavorites } from './track-favorites/track-favorites';

export const routes: Routes = [
  { path: '', redirectTo: 'tracks', pathMatch: 'full' },
  { path: 'tracks', loadComponent: () => import('./track-list/track-list').then((m) => m.TrackList) },
  { path: 'tracks/new', canActivate: [authGuard],
    loadComponent: () => import('./track-form/track-form').then((m) => m.TrackForm) },
  { path: 'tracks/:id', loadComponent: () => import('./track-detail/track-detail').then((m) => m.TrackDetail) },
  { path: 'tracks/:id/edit', canActivate: [authGuard],
    loadComponent: () => import('./track-form/track-form').then((m) => m.TrackForm) },
  { path: 'login', loadComponent: () => import('./login/login').then((m) => m.Login) },
  environment.features.favorites 
  ? { path: 'favorites', canActivate: [authGuard], loadComponent: () => import('./track-favorites/track-favorites').then((m) => m.TrackFavorites) }
  : {path: 'favorites', redirectTo: 'tracks', pathMatch: 'full'}
]
  
