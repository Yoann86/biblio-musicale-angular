import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TrackCard } from '../track-card/track-card';
import { TrackSearch } from '../track-search/track-search';
import { Track } from '../models/track';
import { AuthService } from '../services/auth-service';
import { TrackService } from '../services/track-service';

@Component({
  selector: 'app-track-list',
  imports: [TrackCard, RouterLink, TrackSearch],
  templateUrl: './track-list.html',
  styleUrl: './track-list.css'
})
export class TrackList {
  protected tracks = signal<Track[]>([]);
  protected selectedId = signal<number | null>(null);
  private router = inject(Router);
  private service = inject(TrackService);
  protected auth = inject(AuthService);

  protected onSearch(results: Track[]) {
    this.tracks.set(results);
  }

  protected onSelect(track: Track) {
    this.selectedId.set(track.id);
  }

  protected onOpen(track: Track) {
    this.router.navigate(['/tracks', track.id]);
  }

  protected onToggleFavorite(track: Track) {
    const call = track.favorite
      ? this.service.removeFavorite(track.id)
      : this.service.addFavorite(track.id);

    call.subscribe({
      next: (updated) => this.tracks.update(list =>
        list.map(t => t.id === updated.id ? updated : t)
      ),
      error: (err) => console.error(err),
    });
  }
}
