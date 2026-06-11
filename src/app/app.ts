import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrackList } from './track-list/track-list';
import { Track } from './models/track';
import { TrackService } from './services/track-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { TrackSearch } from './track-search/track-search';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
})
export class App {
  // protected tracks = signal<Track[]>([
  //   { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours',
  //     genre: 'Synth-pop', durationSeconds: 200, year: 2019, rating: 9,
  //     favorite: true, coverUrl: 'https://picsum.photos/seed/1/300' },
  //   { id: 2, title: 'As It Was', artist: 'Harry Styles', album: "Harry's House",
  //     genre: 'Pop', durationSeconds: 167, year: 2022, rating: 8,
  //     favorite: false, coverUrl: 'https://picsum.photos/seed/2/300' },
  //   // … autres morceaux
  // ]);
  private trackService = inject(TrackService);
  protected tracks = toSignal(this.trackService.getTracks(), {
    initialValue: [] as Track[],
  });

  // addTrack(track: Track) {
  //   this.tracks.update((list) => [...list, track]);
  // }
}