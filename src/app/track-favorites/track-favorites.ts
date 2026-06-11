import { Component, inject, signal } from '@angular/core';
import { TrackService } from '../services/track-service';
import { Track } from '../models/track';
import { TrackCard } from '../track-card/track-card';

@Component({
  selector: 'app-track-favorites',
  imports: [TrackCard],
  templateUrl: './track-favorites.html',
  styleUrl: './track-favorites.css',
})
export class TrackFavorites {
  private service = inject(TrackService);
  protected tracks = signal<Track[]>([]);

  constructor() {
    this.service.getFavorites().subscribe({
      next: (res) => this.tracks.set(res)
    });
  }

  onRemoveFavorite(id: number) {
    this.service.removeFavorite(id).subscribe({
      next: () => this.tracks.update(list => list.filter(track => track.id !== id)),
      error : (err) =>  console.error(err)
    });
  }
}
