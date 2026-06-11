import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TrackCard } from '../track-card/track-card';
import { TrackSearch } from '../track-search/track-search';
import { Track } from '../models/track';
import { AuthService } from '../services/auth-service';

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
}
